import React, { useRef } from 'react'
import { WebView} from 'react-native-webview'

const AudioProcessor = () => {
    // Correctly type the ref
    const webViewRef = useRef<WebView>(null)
    const rate = 1.5


    // Dummy audio data (replace with actual data)
    const audioData = 'https://file-examples.com/storage/fe5048eb7365a64ba96daa9/2017/11/file_example_MP3_700KB.mp3'

    // Call this function to send data to the WebView
    const playAudioInWebView = (url: string, rate: number) => {
        const script = `playAudio("${url}", ${rate})`
        if (webViewRef.current) {
            webViewRef.current.injectJavaScript(script)
        }
    }

    return (
        <WebView
            ref={webViewRef}
            source={require('../assets/html/audio-processor.html')}
            onLoadEnd={() => playAudioInWebView(audioData, rate)}
        />
    )
}

export default AudioProcessor
