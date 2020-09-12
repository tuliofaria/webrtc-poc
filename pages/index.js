import React, { useState, useEffect } from 'react'

const configuration = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
}

const Index = () => {
  useEffect(() => {
    const run = async () => {
      let peerConnection = new RTCPeerConnection(configuration)
      peerConnection.addEventListener('icegatheringstatechange', () => {
        console.log(
          `ICE gathering state changed: ${peerConnection.iceGatheringState}`
        )
      })

      peerConnection.addEventListener('connectionstatechange', () => {
        console.log(
          `Connection state change: ${peerConnection.connectionState}`
        )
      })

      peerConnection.addEventListener('signalingstatechange', () => {
        console.log(`Signaling state change: ${peerConnection.signalingState}`)
      })

      peerConnection.addEventListener('iceconnectionstatechange ', () => {
        console.log(
          `ICE connection state change: ${peerConnection.iceConnectionState}`
        )
      })

      const offer = await peerConnection.createOffer()
      await peerConnection.setLocalDescription(offer)
      const roomWithOffer = {
        offer: {
          type: offer.type,
          sdp: offer.sdp,
        },
      }
      console.log(roomWithOffer)
    }
    run()
  }, [])
  return (
    <div>
      <h1>DevChat</h1>
      <button>Create connection</button>

      <pre></pre>
    </div>
  )
}
export default Index
