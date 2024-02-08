import * as FileSystem from 'expo-file-system'

export async function getBase64Mp3(uri: string) {
    try {
        return await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 })
    } catch (e) {
        console.error('Error reading MP3 file as Base64 string:', e)
        return null
    }
}
