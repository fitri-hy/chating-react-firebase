# Realtime Chating React & Firebase Database

<h2>Config Configuration</h2>
<p>src/firebase.js</p>
<pre>
const firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxxxxxxxx",
  authDomain: "xxxxxxxxxxxxxxxxxxxx",
  projectId: "xxxxxxxxxxxxxxxxxxxx",
  storageBucket: "xxxxxxxxxxxxxxxxxxxx",
  messagingSenderId: "xxxxxxxxxxxxxxxxxxxx",
  appId: "xxxxxxxxxxxxxxxxxxxx",
  databaseURL: "xxxxxxxxxxxxxxxxxxxx",
  storageURL: "xxxxxxxxxxxxxxxxxxxx"
};
</pre>

<h2>Firebase Settings</h2>
<ul>
  <li>Go to <a href="https://console.firebase.google.com/">Firebase</a></li>
  <li>Add App -> Web - Copy Firebase Config (✔️)</li>
  <li>Activate Authentication -> Email/Password (✔️)</li>
  <li>Activate Realtime Database - > Rules: (✔️)</li>
  <pre>
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
  </pre>
  <li>Activate Cloud Firestore : Rules (✔️)</li>
    <pre>
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
  </pre>
  <li>Activate Storage -> Rules: (✔️)</li>
  <pre>
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write;
    }
  }
}
  </pre>
</ul>

<h2>Run Project</h2>
<pre>
git clone https://github.com/fitri-hy/chating-react-firebase.git
npm install
npm start
</pre>

<h2>Testing</h2>
<ul>
  <li>Node v21.0.0</li>
  <li>npm v10.4.0</li>
</ul>

<p>Demo: <a href="https://chating-react-firebase.vercel.app">VIEW DEMO</a></p>
<p>Follow Me: <a href="https://hy-tech.my.id/">HyTech Group</a></p>
