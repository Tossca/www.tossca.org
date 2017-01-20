module.exports = class BrowserDetect
  
  constructor: ->
    @browser = @searchString(@dataBrowser) or 'Other'
    @version = @searchVersion(navigator.userAgent) or @searchVersion(navigator.appVersion) or 'Unknown'
    
  searchString: (data) ->
    i = 0
    while i < data.length
      dataString = data[i].string
      @versionSearchString = data[i].subString
      if dataString.indexOf(data[i].subString) != -1
        return data[i].identity
      i++
    
  searchVersion: (dataString) ->
    index = dataString.indexOf(@versionSearchString)
    if index == -1
      return
    rv = dataString.indexOf('rv:')
    if @versionSearchString == 'Trident' and rv != -1
      parseFloat dataString.substring(rv + 3)
    else
      parseFloat dataString.substring(index + @versionSearchString.length + 1)

  dataBrowser: [
    {
      string: navigator.userAgent
      subString: 'Edge'
      identity: 'MS Edge'
    }
    {
      string: navigator.userAgent
      subString: 'Chrome'
      identity: 'Chrome'
    }
    {
      string: navigator.userAgent
      subString: 'MSIE'
      identity: 'Explorer'
    }
    {
      string: navigator.userAgent
      subString: 'Trident'
      identity: 'Explorer'
    }
    {
      string: navigator.userAgent
      subString: 'Firefox'
      identity: 'Firefox'
    }
    {
      string: navigator.userAgent
      subString: 'Safari'
      identity: 'Safari'
    }
    {
      string: navigator.userAgent
      subString: 'Opera'
      identity: 'Opera'
    }
  ]