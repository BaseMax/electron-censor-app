# Electron Censor App

The Electron Censor App is a simple desktop application built with Electron.js that allows users to censor specific words in a given text. Users can input text, and the app will automatically replace any specified words with asterisks (`*`).

![Electron Censor App](demo.jpg)

## Features

- Load a list of words (from text files) to censor.
- Replace censored words with asterisks in real-time as the user presses the "Censor" button.
- Supports both Persian and English words.
- Built using Electron for cross-platform compatibility.

## Installation

To run the Electron Censor App locally, follow the steps below:

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/BaseMax/electron-censor-app.git
   ```

2. Navigate into the project directory:

   ```bash
   cd electron-censor-app
   ```

3. Install the dependencies using npm:

   ```bash
   npm install
   ```

4. Build the app:

   ```bash
   npm run build
   ```

5. Run the app:

   ```bash
   npm run start
   ```

This will launch the Electron app and open a window where you can enter text to censor.

6. Release and build `.exe` for Windows OS:

   ```bash
   npm run dist
   > electron-censor-app@1.0.0 dist
   > electron-builder
   
   • electron-builder  version=25.1.8 os=10.0.26100
   • loaded configuration  file=package.json ("build" field)
   • writing effective config  file=dist\builder-effective-config.yaml
   • executing @electron/rebuild  electronVersion=33.2.1 arch=x64 buildFromSource=false appDir=./
   • installing native dependencies  arch=x64
   • completed installing native dependencies
   • packaging       platform=win32 arch=x64 electron=33.2.1 appOutDir=dist\win-unpacked
   • downloading     url=https://github.com/electron/electron/releases/download/v33.2.1/electron-v33.2.1-win32-x64.zip
    size=115 MB parts=8
   ```

## Usage

The app loads words to censor from text files (`persian.txt` and `english.txt`).

Once the app is loaded, you can enter text into the provided textarea.

Clicking the "Censor" button will replace any matching words in the input text with asterisks (*), and the censored text will appear in the output textarea.

## Development

To contribute or modify the app, you can make changes to the source code located in the `src/` directory. After making changes, you can rebuild the app using Electron's build tools.

Start the app in development mode:

```bash
npm run dev
```

This will open the app in a development environment where you can test changes in real-time.

### License

This project is licensed under the MIT License.

Copyright (c) 2024, Max Base
