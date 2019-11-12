'use strict';

import { Settings } from './settings';
import { LOG } from './utils';

// grab UI controls from document
const volumeElem = document.getElementById('volume');
const muteElem = document.getElementById('mute');
const voiceElems = document.querySelectorAll('input[type="radio"][name="voice"]');

// initialize values for UI controls
Settings.get(['volume', 'mute', 'voice'], ({ volume, mute, voice }) => {
  volumeElem.value = volume;
  muteElem.checked = mute;
  Array.from(voiceElems).filter(e => e.value === voice)[0].checked = true;
});

const notifySettingsChange = () => {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"type": "settingsChanged"});
  });
};

// add on change listeners to controls, so changes are reflected into
// persistent settings

volumeElem.addEventListener('change', (event) => {
  const value = event.target.value;
  Settings.set({ volume: value }, notifySettingsChange);
});

muteElem.addEventListener('change', (event) => {
  const value = event.target.checked;
  Settings.set({ mute: value }, notifySettingsChange);
});

voiceElems.forEach((e) => {
  e.addEventListener('change', (event) => {
    const value = event.target.value;
    Settings.set({ voice: value }, notifySettingsChange);
  });
});
