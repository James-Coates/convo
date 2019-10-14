# CONVO

A Chat application built using the Expo toolset offering simple chat facilities on both iOS and andorid.

## Getting Started

### Set Up Expo and Your Development Environment

To set up Expo and your development environment, you'll need [Node](https://nodejs.org/en/) installed. You will also need to install the [Expo](https://expo.io/) Command Line Interface (CLI). To install this globally use the following command in your terminal:

```bash
npm install expo-cli --global
```

Now, you need an Expo account. Head over to the Expo sign-up page and follow the instructions to create an account. Once that’s done, you should be able to log in to Expo from your browser as well as the mobile app.

This is how the Expo app will look on your phone right after installation:

![expo start screen](https://images.careerfoundry.com/public/courses/fullstack-immersion/A5/E2/expo%20projects%20ui.png)

### Setting up simulator

iOS Simulator
To set up the iOS simulator, you need XCode on your Mac. It's available to download from the App Store

After installing XCode, open it up and head over to “Preferences.” From there, click “Components” and install a simulator from the list. Open the simulator, start your Expo project, and click “Run on iOS simulator.”

Android Emulator
To set up Android Emulator, you first need to download and install Android Studio. To do this, follow the on-screen installation instructions and make sure you don’t untick the “Android Virtual Device” option in the installation dialog.

After the installation is complete, start Android Studio, click “Configure,” and go to Settings -> Appearance & Behaviour -> System Settings -> Android SDK. Click the “SDK Tools” tab and check that you have “Android SDK Build-Tools” installed. Below is a screenshot of how this screen should look. If your “Android SDK Build-Tools” aren’t installed, click on the “Android SDK Build-Tools” row, then download the latest version by clicking on the download symbol that appears next to it:

macOS and Linux only: You need to add the location of the Android SDK to your PATH. To do so, copy the path (in the picture above, it’s the path next to “Android SDK Location”) and add the following to your “~/.bashprofile” or “~/.bashrc” file:

```bash
export ANDROID_SDK=/Users/myuser/Library/Android/sdk
```

Make sure to edit the path in the line above because it will look different for you.

macOS only: You also need to add platform-tools to your “~/.bashprofile” or “~/.bashrc” file. To do this, add:

```bash
export PATH=/Users/myuser/Library/Android/sdk/platform-tools:$PATH
```

Again, make sure to edit the path in the line above because it will look different for you.

Close the “Settings for New Projects” window and click “Configure” again. This time, however, select “AVD Manager,” then “Create Virtual Device,” and, finally, a phone from the list. As you can see in the image below, you can download emulators for different devices. Go ahead and pick whichever device you want, then click “Next”:

This will take you to the “System Image” interface. Click on the “Recommended” tab and select an operating system:

Click the “Download” link next to whichever OS you want to install. Android Studio will download that image for you, which might take a few minutes. In the next window, give your device a name, then click “Finish.”

Now, head back to the Virtual Device Manager and click “Play” to start your newly created emulator. Finally, head to the “Browser” tab of the project you’re currently running in Expo and click “Run on Android device/emulator.” Expo will start installing the Expo client on your virtual device and start your project.

### Set Up Firestore Database

Data is designed to be stored on a Firestore databse. 

To get started, head over to Google Firebase and “Sign in” or create an account.

Next, click on the “Go to console” link and choose “Add project.” The default settings will suffice.

With the new project created and in the project console choose “Create database” in the Cloud Firestore section.

Start the database in test mode but **note** that anyone will be able to read and write from onto your databse.

With "test mode" enabled it's not time to create a collection. Name the collection "messages". You will then be asked to create the first document in the collection. Use the following fields for this document:

![Firebase Document](https://i.ibb.co/y57kY20/Screenshot-2019-10-14-at-19-30-21.png)

Next open up your “Project Settings” (by clicking on the gear icon). Under the “General” tab, you’ll find a section called “Your apps,” which is where you can generate configurations for different platforms. Click the “Firestore for Web” button, which will open up the following modal:

![apiKey](https://images.careerfoundry.com/public/courses/fullstack-immersion/A5/E4/A5-E3-test-firestore-configuration.PNG)

Copy the contents of the config object (from { apiKey:… to messagingSenderId:…}) in this modal. You will need to paste this into the firebaseConfig file in the following directory:

components/utils/firebaseConfig.js

#### Firebase Authentication

To set up simple authentication, back in the firestore console click on "authentication" under "Develop" and click on anonymous. 

![](https://images.careerfoundry.com/public/courses/fullstack-immersion/A5/E4/anonymous_authentication.png)

### Starting the Application

If everything is set up correctly you should be able to navigate to the project folder and use the following command to initiate the application:

```bash
expo start
```

The application should start on on