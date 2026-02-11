# WizCast - Global Weather Application

WizCast is a modern, responsive web application that provides real-time weather information for any city worldwide. It features a premium glassmorphism design with dynamic background gradients that shift based on the current temperature.

## Features

- **Global Search**: Find weather data for any location using the Open-Meteo Geocoding API.
- **Real-Time Data**: Get up-to-the-minute weather conditions including:
  - Temperature (Current & "Feels Like")
  - Weather Condition (Clear, Rainy, Cloudy, etc.)
  - Wind Speed
  - Humidity
  - Elevation
- **Dynamic Backgrounds**: The application background changes color based on the temperature:
  - **Freezing (< 0°C)**: Deep Ice Blue
  - **Cold (0-10°C)**: Dark Crisp Blue
  - **Mild (10-20°C)**: Sunny Teal/Blue
  - **Warm (20-30°C)**: Sunset Orange
  - **Hot (> 30°C)**: Intense Red
- **Premium UI**: 
  - Glassmorphism card design with high contrast adjustments.
  - Fully responsive layout for mobile and desktop.
  - Interactive animations and Lucide icons.

## built With

- **HTML5**: Semantic structure.
- **CSS3**: Variables, Flexbox/Grid, Glassmorphism, Animations.
- **JavaScript (ES6+)**: Async/Await, DOM Manipulation, Fetch API.
- **APIs**: [Open-Meteo](https://open-meteo.com/) (Weather & Geocoding) - **No API Key Required**.
- **Libraries**:
  - [Lucide Icons](https://lucide.dev/) (via CDN)
  - [Google Fonts](https://fonts.google.com/) (Inter)

## Installation & Setup

This is a **static web application**, meaning it runs directly in the browser without needing a backend server or complex build tools like Node.js.

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari).
- Internet connection (to fetch API data and CDN resources).

### Steps to Run
1.  **Download the Project**:
    - Clone this repository or download the ZIP file.
    *(If you just have the files `index.html`, `style.css`, and `script.js`)*:
    ```bash
    c:\Projects\web-app\
    ├── index.html
    ├── style.css
    └── script.js
    ```

2.  **Open the Application**:
    - Navigate to the project folder.
    - Double-click on `index.html`.
    - The application will open in your default web browser.

## Usage

1.  **Search**: Click the input field and type the name of a city (e.g., "London", "Tokyo", "Reykjavik").
2.  **Submit**: Press `Enter` or click the `Search` button.
3.  **View Weather**: The interface will update with the location's current weather data and the background gradient will shift to match the temperature.

## Project Structure

- `index.html`: The main structured document. Links the CSS and JS files and imports external resources (Fonts, Icons).
- `style.css`: Contains all visual styles, variables for colors/gradients, and responsiveness rules.
- `script.js`: Handles user logical flow, fetches data from the Open-Meteo API, updates the DOM, and calculates the dynamic background gradient.

## License

This project is open-source and free to use. Data provided by [Open-Meteo](https://open-meteo.com/) under the [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) license.
