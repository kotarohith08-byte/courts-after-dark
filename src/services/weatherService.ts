import { WeatherInfo } from '../types';

const LPU_LAT = 31.2536;
const LPU_LNG = 75.7037;

export async function fetchLpuWeather(): Promise<WeatherInfo> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${LPU_LAT}&longitude=${LPU_LNG}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,precipitation_probability,weather_code&timezone=Asia%2FKolkata&forecast_days=1`;
    
    const response = await fetch(url, { signal: AbortSignal.timeout(4000) });
    if (!response.ok) throw new Error('Weather API error');
    
    const data = await response.json();
    const current = data.current;
    const hourly = data.hourly;

    const weatherCode = current.weather_code || 0;
    const { condition, isRain } = mapWeatherCode(weatherCode);
    const temp = Math.round(current.temperature_2m);
    const feelsLike = Math.round(current.apparent_temperature);
    const humidity = Math.round(current.relative_humidity_2m);
    const windSpeed = Math.round(current.wind_speed_10m);

    // Calculate precipitation chance for current hour
    const nowHour = new Date().getHours();
    const rainChance = hourly?.precipitation_probability?.[nowHour] ?? (isRain ? 75 : 10);

    // Calculate Playability Index (0-100)
    let playability = 95;
    if (rainChance > 50) playability -= 45;
    else if (rainChance > 20) playability -= 20;

    if (temp > 35) playability -= 30;
    else if (temp < 10) playability -= 15;

    if (windSpeed > 25) playability -= 25;
    else if (windSpeed > 15) playability -= 10;

    playability = Math.max(10, Math.min(100, playability));

    // Dynamic advice
    let advice = "Optimal conditions for nighttime sports at LPU.";
    if (rainChance >= 40) {
      advice = "Rain is expected. Consider postponing outdoor sports or booking Shanti Devi Mittal Indoor Stadium.";
    } else if (windSpeed > 22) {
      advice = "Breezy conditions. Outdoor badminton or tennis may experience wind drift; indoor arena recommended.";
    } else if (temp < 14) {
      advice = "Cool evening air. Warm up thoroughly before starting intense games.";
    } else if (humidity > 80) {
      advice = "High humidity detected. Keep adequate water handy from campus RO stations.";
    }

    // Format hourly items (next 6 hours)
    const formattedHourly = [];
    for (let i = 0; i < 6; i++) {
      const idx = (nowHour + i) % 24;
      const hTime = `${idx % 12 === 0 ? 12 : idx % 12} ${idx >= 12 ? 'PM' : 'AM'}`;
      const hTemp = Math.round(hourly?.temperature_2m?.[idx] || temp);
      const hRain = hourly?.precipitation_probability?.[idx] || 5;
      formattedHourly.push({
        time: hTime,
        temp: hTemp,
        rainProb: hRain,
        icon: hRain > 30 ? 'cloud-rain' : 'moon'
      });
    }

    return {
      temperature: temp,
      feelsLike,
      humidity,
      windSpeed,
      condition,
      rainChance,
      sunsetTime: '05:34 PM',
      playabilityIndex: playability,
      playabilityAdvice: advice,
      isLive: true,
      hourly: formattedHourly
    };
  } catch (err) {
    // Graceful fallback to verified typical Phagwara evening weather
    return getFallbackWeather();
  }
}

function mapWeatherCode(code: number): { condition: string; isRain: boolean } {
  if (code === 0) return { condition: 'Clear Sky', isRain: false };
  if (code >= 1 && code <= 3) return { condition: 'Partly Cloudy', isRain: false };
  if (code >= 45 && code <= 48) return { condition: 'Misty / Foggy', isRain: false };
  if (code >= 51 && code <= 67) return { condition: 'Light Drizzle', isRain: true };
  if (code >= 71 && code <= 77) return { condition: 'Cold Overcast', isRain: false };
  if (code >= 80 && code <= 82) return { condition: 'Rain Showers', isRain: true };
  if (code >= 95) return { condition: 'Thunderstorm', isRain: true };
  return { condition: 'Clear Night', isRain: false };
}

export function getFallbackWeather(): WeatherInfo {
  return {
    temperature: 21,
    feelsLike: 20,
    humidity: 58,
    windSpeed: 9,
    condition: 'Clear Campus Sky',
    rainChance: 8,
    sunsetTime: '05:34 PM',
    playabilityIndex: 92,
    playabilityAdvice: 'Optimal weather for nighttime outdoor sports. Courts are dry with crisp visibility.',
    isLive: false,
    hourly: [
      { time: '6 PM', temp: 22, rainProb: 5, icon: 'moon' },
      { time: '7 PM', temp: 21, rainProb: 5, icon: 'moon' },
      { time: '8 PM', temp: 20, rainProb: 8, icon: 'moon' },
      { time: '9 PM', temp: 19, rainProb: 10, icon: 'moon' },
      { time: '10 PM', temp: 18, rainProb: 10, icon: 'moon' },
      { time: '11 PM', temp: 17, rainProb: 12, icon: 'moon' }
    ]
  };
}
