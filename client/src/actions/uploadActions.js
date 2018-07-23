export function changePrivacyOption(privacy) {
  return {
    type: 'CHANGE_UPLOAD_PRIVACY_OPTION',
    privacy
  }
}

export function uploadVideoFile(file) {
  return {
    type: 'UPLOAD_VIDEO_FILE',
    file
  }
}