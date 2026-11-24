import React, { useEffect, useRef, useState } from 'react';
import { Court } from '../types';
import { useApp } from '../context/AppContext';
import { LPU_COMMON_ORIGINS } from '../data/lpuCourts';
import L from 'leaflet';
import { Navigation, ExternalLink, Clock, MapPin, Footprints, ShieldAlert, Layers } from 'lucide-react';

interface InteractiveMapProps {
  courts?: Court[];
  selectedCourt?: Court | null;
  onSelectCourt?: (court: Court) => void;
  onBookCourt?: (court: Court) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  courts: propsCourts,
  selectedCourt: propsSelectedCourt,
  onSelectCourt: propsOnSelectCourt,
  onBookCourt: propsOnBookCourt
}) => {
  const context = useApp();
  const courts = propsCourts || context.courts;
  const selectedCourt = propsSelectedCourt !== undefined ? propsSelectedCourt : context.selectedCourt;
  const onSelectCourt = propsOnSelectCourt || context.setSelectedCourt;
  const onBookCourt = propsOnBookCourt || context.setBookingModalCourt;
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const routeLineRef = useRef<L.Polyline | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  const [selectedOrigin, setSelectedOrigin] = useState(LPU_COMMON_ORIGINS[0]);
  const [walkingDistanceMeters, setWalkingDistanceMeters] = useState<number | null>(null);
  const [walkingMinutes, setWalkingMinutes] = useState<number | null>(null);
  const [mapTheme, setMapTheme] = useState<'dark' | 'osm' | 'satellite'>('dark');

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // LPU Campus Coordinates
    const map = L.map(mapContainerRef.current, {
      center: [31.2548, 75.7032],
      zoom: 15,
      zoomControl: true
    });

    const tileGroup = L.layerGroup().addTo(map);
    tileLayerGroupRef.current = tileGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Tile Layers when mapTheme changes (No API Keys Required)
  useEffect(() => {
    const tileGroup = tileLayerGroupRef.current;
    if (!tileGroup) return;

    tileGroup.clearLayers();

    if (mapTheme === 'dark') {
      // 100% Free Esri Dark Canvas with no API key requirement
      const baseLayer = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: '&copy; OpenStreetMap contributors, Esri',
          maxZoom: 19,
          maxNativeZoom: 16
        }
      );
      const labelsLayer = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 19,
          maxNativeZoom: 16
        }
      );
      tileGroup.addLayer(baseLayer);
      tileGroup.addLayer(labelsLayer);
    } else if (mapTheme === 'osm') {
      // Standard OpenStreetMap (Public & Free)
      const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: ['a', 'b', 'c'],
        maxZoom: 19
      });
      tileGroup.addLayer(osmLayer);
    } else if (mapTheme === 'satellite') {
      // Free Esri Satellite Imagery
      const satLayer = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: '&copy; Esri, Maxar, Earthstar Geographics',
          maxZoom: 19,
          maxNativeZoom: 18
        }
      );
      tileGroup.addLayer(satLayer);
    }
  }, [mapTheme]);

  // Update Court Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old markers
    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    courts.forEach(court => {
      const isSelected = selectedCourt?.id === court.id;
      const statusColor = 
        court.status === 'available' ? '#10b981' : 
        court.status === 'occupied' ? '#f59e0b' : '#ef4444';

      const customIcon = L.divIcon({
        className: 'custom-court-marker',
        html: `
          <div style="
            background: #090e1d;
            border: 2px solid ${isSelected ? '#00e5ff' : statusColor};
            border-radius: 9999px;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 14px ${isSelected ? 'rgba(0, 229, 255, 0.8)' : statusColor};
            transform: ${isSelected ? 'scale(1.2)' : 'scale(1.0)'};
            transition: all 0.2s ease;
            cursor: pointer;
          ">
            <span style="font-size: 14px;">${getSportEmoji(court.sport)}</span>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker(court.coordinates, { icon: customIcon }).addTo(map);

      // Popup Content
      const popupHtml = `
        <div style="font-family: inherit; color: #f8fafc; padding: 2px; min-width: 180px;">
          <div style="font-weight: 700; font-size: 13px; color: #38bdf8;">${court.name}</div>
          <div style="font-size: 11px; color: #94a3b8; margin: 2px 0;">${court.landmark}</div>
          <div style="margin-top: 6px; font-size: 11px; display: flex; justify-content: space-between; align-items: center;">
            <span style="color: ${statusColor}; font-weight: 600; text-transform: uppercase;">${court.status}</span>
            <span style="background: rgba(56, 189, 248, 0.15); color: #7dd3fc; padding: 2px 6px; border-radius: 4px;">${court.timings.open} - ${court.timings.close}</span>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);
      marker.on('click', () => {
        onSelectCourt(court);
      });

      markersRef.current[court.id] = marker;
    });
  }, [courts, selectedCourt]);

  // Update Origin Marker & Route Line
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Update User/Origin Marker
    if (userMarkerRef.current) userMarkerRef.current.remove();

    const originIcon = L.divIcon({
      className: 'user-origin-marker',
      html: `
        <div style="
          background: #38bdf8;
          border: 3px solid #ffffff;
          border-radius: 9999px;
          width: 22px;
          height: 22px;
          box-shadow: 0 0 16px rgba(56, 189, 248, 0.9);
          animation: pulse 2s infinite;
        "></div>
      `,
      iconSize: [22, 22],
      iconAnchor: [11, 11]
    });

    userMarkerRef.current = L.marker([selectedOrigin.lat, selectedOrigin.lng], { icon: originIcon })
      .bindTooltip(`Starting Point: ${selectedOrigin.name}`, { permanent: false })
      .addTo(map);

    // If court selected, draw line & calculate distance
    if (selectedCourt) {
      if (routeLineRef.current) routeLineRef.current.remove();

      const originCoords: [number, number] = [selectedOrigin.lat, selectedOrigin.lng];
      const courtCoords: [number, number] = selectedCourt.coordinates;

      // Draw dashed neon path
      routeLineRef.current = L.polyline([originCoords, courtCoords], {
        color: '#00e5ff',
        weight: 3,
        dashArray: '6, 8',
        opacity: 0.85
      }).addTo(map);

      // Pan to fit both
      const bounds = L.latLngBounds([originCoords, courtCoords]);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 17 });

      // Calculate straight-line distance with 1.25 pedestrian path factor
      const distM = Math.round(L.latLng(originCoords).distanceTo(L.latLng(courtCoords)) * 1.25);
      setWalkingDistanceMeters(distM);
      setWalkingMinutes(Math.max(1, Math.round(distM / 80)));
    } else {
      if (routeLineRef.current) routeLineRef.current.remove();
      setWalkingDistanceMeters(null);
      setWalkingMinutes(null);
    }
  }, [selectedOrigin, selectedCourt]);

  const getSportEmoji = (sport: string) => {
    switch (sport) {
      case 'Basketball': return '🏀';
      case 'Badminton': return '🏸';
      case 'Football': return '⚽';
      case 'Volleyball': return '🏐';
      case 'Tennis': return '🎾';
      case 'Table Tennis': return '🏓';
      case 'Cricket': return '🏏';
      case 'Squash': return '🎾';
      default: return '⚡';
    }
  };

  const getExternalMapsUrl = (court: Court) => {
    return `https://www.google.com/maps/dir/?api=1&origin=${selectedOrigin.lat},${selectedOrigin.lng}&destination=${court.coordinates[0]},${court.coordinates[1]}&travelmode=walking`;
  };

  return (
    <div className="space-y-4">
      {/* Starting Location Picker & Map Theme Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-dark-900/90 border border-slate-800">
        <div className="flex items-center gap-2">
          <Footprints className="w-4 h-4 text-electric-400" />
          <span className="text-xs font-semibold text-slate-200">
            Select Your Campus Location:
          </span>
          <select
            value={selectedOrigin.name}
            onChange={(e) => {
              const found = LPU_COMMON_ORIGINS.find(o => o.name === e.target.value);
              if (found) setSelectedOrigin(found);
            }}
            className="px-3 py-1.5 rounded-lg bg-dark-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-electric-400"
          >
            {LPU_COMMON_ORIGINS.map(origin => (
              <option key={origin.name} value={origin.name}>
                📍 {origin.name}
              </option>
            ))}
          </select>
        </div>

        {/* Map Theme Toggle (Free & No API Key Required) */}
        <div className="flex items-center gap-1.5 bg-dark-950 p-1 rounded-xl border border-slate-700 text-xs self-start sm:self-auto">
          <span className="text-[10px] text-slate-500 uppercase px-2 font-mono flex items-center gap-1">
            <Layers className="w-3 h-3 text-electric-400" /> Layer:
          </span>
          <button
            onClick={() => setMapTheme('dark')}
            className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
              mapTheme === 'dark' ? 'bg-electric-500 text-dark-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Night Dark
          </button>
          <button
            onClick={() => setMapTheme('osm')}
            className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
              mapTheme === 'osm' ? 'bg-electric-500 text-dark-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            OpenStreet
          </button>
          <button
            onClick={() => setMapTheme('satellite')}
            className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
              mapTheme === 'satellite' ? 'bg-electric-500 text-dark-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Satellite
          </button>
        </div>
      </div>

      {/* Map View Container */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-dark-950 h-[480px] sm:h-[540px]">
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Selected Court Walking Card Overlay */}
        {selectedCourt && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-4 sm:right-auto sm:max-w-md z-20 p-4 rounded-2xl bg-dark-950/95 backdrop-blur-xl border border-electric-500/40 shadow-2xl space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-electric-400 bg-electric-500/10 px-2 py-0.5 rounded border border-electric-500/20">
                  {selectedCourt.sport} • {selectedCourt.indoorOutdoor}
                </span>
                <h4 className="font-bold text-sm text-white mt-1 font-['Space_Grotesk']">
                  {selectedCourt.name}
                </h4>
                <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {selectedCourt.landmark}
                </p>
              </div>

              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                selectedCourt.status === 'available'
                  ? 'bg-neon-500/10 text-neon-400 border-neon-500/30'
                  : selectedCourt.status === 'occupied'
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
              }`}>
                {selectedCourt.status}
              </span>
            </div>

            {/* Navigation & Distance Info */}
            {walkingDistanceMeters !== null && walkingMinutes !== null && (
              <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-dark-900/90 border border-slate-800 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Footprints className="w-3.5 h-3.5 text-electric-400" />
                  <span>~{walkingDistanceMeters}m walk</span>
                </div>
                <div className="flex items-center gap-1.5 text-neon-400 font-semibold justify-end">
                  <Clock className="w-3.5 h-3.5 text-neon-400" />
                  <span>~{walkingMinutes} min walking</span>
                </div>
              </div>
            )}

            {!selectedCourt.isVerified && (
              <div className="text-[10px] text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded p-1.5 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>Demo Data – Location Confirmation Required</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => onBookCourt(selectedCourt)}
                className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-electric-500 to-neon-500 text-dark-950 font-bold text-xs uppercase tracking-wide hover:brightness-110 transition-all font-['Space_Grotesk']"
              >
                Book Court Slot
              </button>
              <a
                href={getExternalMapsUrl(selectedCourt)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs flex items-center gap-1 transition-colors"
                title="Open in Google Maps"
              >
                <ExternalLink className="w-4 h-4 text-electric-400" />
                <span className="hidden sm:inline">Directions</span>
              </a>
            </div>
          </div>
        )}

        {/* Map Legend */}
        <div className="absolute top-4 right-4 z-20 bg-dark-950/90 backdrop-blur-md border border-slate-800 p-2.5 rounded-xl text-[11px] space-y-1.5 shadow-xl hidden sm:block">
          <div className="font-semibold text-slate-300 text-[10px] uppercase tracking-wider mb-1">
            Court Status
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-neon-400 shadow-glow-green"></span>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span>Occupied</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span>Maintenance / Closed</span>
          </div>
        </div>
      </div>
    </div>
  );
};
