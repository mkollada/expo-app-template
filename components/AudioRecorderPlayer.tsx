import React, { useState, useEffect } from 'react'
import { View, Button, Text } from 'react-native'
import { Audio } from 'expo-av'

const AudioRecorderPlayer = () => {
    const [recording, setRecording] = useState<Audio.Recording | null>(null)
    const [recordedUri, setRecordedUri] = useState<string | null>(null)
    const [sound, setSound] = useState<Audio.Sound | null>(null)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    useEffect(() => {
        return () => {
            sound?.unloadAsync()
        }
    }, [sound])

    const startRecording = async () => {
        try {
            await Audio.requestPermissionsAsync()
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            })
            console.log('Starting recording...')
            const newRecording = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            )
            setRecording(newRecording.recording)
        } catch (err) {
            console.error('Failed to start recording', err)
        }
    }

    const stopRecording = async () => {
        console.log('Stopping recording...')
        if (!recording) return
        setRecording(null)
        await recording.stopAndUnloadAsync()
        const uri = recording.getURI()
        setRecordedUri(uri)
        console.log('Recording stopped and stored at', uri)
    }

    const playRecording = async () => {
        console.log('Loading Sound')
        if (recordedUri) {
            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: recordedUri }
            )
            setSound(newSound)

            console.log('Playing Sound')
            await newSound.playAsync()
            setIsPlaying(true)
            newSound.setOnPlaybackStatusUpdate((playbackStatus) => {
                if (!playbackStatus.isPlaying) {
                    setIsPlaying(false)
                }
            })
        }
    }

    return (
        <View>
            <Button
                title={recording ? 'Stop Recording' : 'Start Recording'}
                onPress={recording ? stopRecording : startRecording}
            />
            {recordedUri && !isPlaying && (
                <Button title="Play Recording" onPress={playRecording} />
            )}
            {isPlaying && <Text>Playing...</Text>}
        </View>
    )
}

export default AudioRecorderPlayer
