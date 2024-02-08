import React, { useRef } from 'react'
import { WebView} from 'react-native-webview'
import { getBase64Mp3 } from './utils/utils'

const AudioProcessor = () => {
    // Correctly type the ref
    const webViewRef = useRef<WebView>(null)
    const rate = 1.5

    


    // Dummy audio data (replace with actual data)
    const audioData = '../mp3s/St_Pete2.mp3'

    // Call this function to send data to the WebView
    const playAudioInWebView = (url: string, rate: number) => {
        const script = `playAudio("${url}", ${rate})`
        if (webViewRef.current) {
            webViewRef.current.injectJavaScript(script)
        }
    }

    async function passDataToWebView() {
        const mp3Base64 = await getBase64Mp3('path/to/your/local/file.mp3')
        const otherData = JSON.stringify({ /* your other data here */ })
    
        const script = `
            loadAudioFromBase64("${mp3Base64}");
            loadData(${otherData});
        `
    
        if (webViewRef.current) {
            webViewRef.current.injectJavaScript(script)
        }
    }
    

    const handleMessage = (event) => {
        console.log('Message from WebView:', event.nativeEvent.data)
    }

    const debugScript = `
    (function() {
        console.log('Document:', document); // Log the document
        console.error = (function(origError) {
        return function(message) {
            alert('Error: ' + message); // Show errors in an alert
            origError.apply(this, arguments);
        };
        })(console.error);

        window.addEventListener('error', function(e) {
        alert('Window Error: ' + e.message); // Catch and display errors
        });
    })();
    `


    return (
        <WebView
            className='flex-1'
            ref={webViewRef}
            source={require('../assets/html/audio-processor.html')}
            onLoadEnd={() => playAudioInWebView(audioData, rate)}
            javaScriptEnabled={true}
            injectedJavaScript={debugScript}
            onMessage={handleMessage}
        />
    )
}

export default AudioProcessor
