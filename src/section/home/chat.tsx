"use client";
import ChatBubble from "@/components/chat/chat-bubble";
import DateDivider from "@/components/chat/chat-divider";
import ChatImage from "@/components/chat/chat-image";
import GALLAERY_1 from "@/assets/home/gallery-01.jpeg";
import React from "react";
import VoiceChat from "@/components/chat/voice-chat";
import DocuChat from "@/components/chat/doc-chat";
import VideoPlayer from "@/components/chat/video-player";
import MissedAudioCall from "@/components/chat/missed-audio-call-chat";

export default function Chat() {
  return (
    <div className="p-4">
      {/* Test chat */}
      <ChatBubble
        sender={false}
        senderName="Edward Lietz"
        message="Hi there! I'm interested in your services."
      />
      <ChatBubble
        sender={false}
        senderName="Edward Lietz"
        message="Can you tell me more about what you offer?, Can you explain it breifly..."
      />
      <ChatBubble
        sender={true}
        message="Hello! Absolutely, we provide a range of services tailored to meet various business needs. Could you specify what you're looking for?"
      />
      <DateDivider date="Today, July 24" />
      <ChatImage sender={false} senderName="Edward Lietz" imgSrc={GALLAERY_1} />
      <VoiceChat sender={true} audioSrc="horse.org" />
      <DocuChat sender={false} senderName="Edward Lietz" />
      <VideoPlayer
        sender={true}
        videoSrc="https://files.vidstack.io/sprite-fight/720p.mp4"
        videoType="video/mp4"
      />
      <MissedAudioCall sender={false} senderName="Edward Lietz" />
    </div>
  );
}
