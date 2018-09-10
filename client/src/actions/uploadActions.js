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

export function updateVideoTitle(title) {
  return {
    type: 'UPLOAD_UPDATE_VIDEO_TITLE',
    title
  }
}

export function updateVideoDescription(description) {
  return {
    type: 'UPLOAD_UPDATE_VIDEO_DESCRIPTION',
    description
  }
}

export function addTag(tag) {
  return {
    type: 'UPLOAD_ADD_TAG',
    tag
  }
}

export function removeTag(tag) {
  return {
    type: 'UPLOAD_REMOVE_TAG',
    tag
  }
}

export function selectUploadThumbnail(thumbnail) {
  return {
    type: 'SELECT_UPLOAD_THUMBNAIL',
    thumbnail
  }
}

export function uploadCustomThumbnail(customThumbnail) {
  return {
    type: 'UPLOAD_CUSTOM_THUMBNAIL',
    customThumbnail
  }
}

export function setPercentageUploaded(percentageUploaded) {
  return {
    type: 'SET_PERCENTAGE_UPLOADED',
    percentageUploaded
  }
}

export function uploadIsComplete() {
  return {
    type: 'UPLOAD_IS_COMPLETE'
  }
}

export function receivedGeneratedThumbnailOption(optionNumber, thumbnailAsBase64) {
  console.log('receivedGeneratedThumbnailOption()');
  return {
    type: 'RECEIVED_GENERATED_THUMBNAIL_OPTION',
    optionNumber,
    thumbnailAsBase64
  }
}