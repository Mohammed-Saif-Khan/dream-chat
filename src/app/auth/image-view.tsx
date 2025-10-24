import Image from "next/image";
import React from "react";
import CIRCLE_1 from "@/assets/auth/circle-1.png";
import CIRCLE_2 from "@/assets/auth/circle-2.png";
import EMOJI_1 from "@/assets/auth/emoji-01.svg";
import EMOJI_2 from "@/assets/auth/emoji-02.svg";
import EMOJI_3 from "@/assets/auth/emoji-03.svg";
import EMOJI_4 from "@/assets/auth/emoji-04.svg";
import RIGHT_ARROW_1 from "@/assets/auth/right-arrow-01.svg";
import RIGHT_ARROW_2 from "@/assets/auth/right-arrow-02.svg";
import LOGIN_BG_IMAGE from "@/assets/auth/login-bg-1.png";
import AVATAR_1 from "@/assets/auth/avatar-02.jpg";
import AVATAR_2 from "@/assets/auth/avatar-03.jpg";
import AVATAR_3 from "@/assets/auth/avatar-05.jpg";
import AVATAR_4 from "@/assets/auth/avatar-12.jpg";
import "@/styles/signin.css";

export default function AuthImageView() {
  return (
    <div className="flex flex-col items-center justify-center h-dvh relative overflow-hidden no-scrollbar">
      <Image
        src={CIRCLE_1}
        width={583}
        height={583}
        alt="circle-image_1"
        className="absolute top-0"
      />
      <Image
        src={CIRCLE_2}
        width={780}
        height={863}
        alt="circle-image_2"
        className="absolute top-0"
      />
      <Image
        src={EMOJI_1}
        width={28}
        height={28}
        alt="emoji-image_1"
        className="absolute bottom-22 right-72"
      />
      <Image
        src={EMOJI_2}
        width={32}
        height={32}
        alt="emoji-image_2"
        className="absolute bottom-8 right-22"
      />
      <Image
        src={EMOJI_3}
        width={32}
        height={32}
        alt="emoji-image_3"
        className="absolute top-8 right-6"
      />
      <Image
        src={EMOJI_4}
        width={28}
        height={28}
        alt="emoji-image_4"
        className="absolute top-8 left-6"
      />
      <Image
        src={RIGHT_ARROW_1}
        width={27}
        height={31}
        alt="arrow-image_1"
        className="absolute bottom-24 right-18"
      />
      <Image
        src={RIGHT_ARROW_2}
        width={29}
        height={31}
        alt="arrow-image_2"
        className="absolute bottom-26 left-22"
      />
      <Image
        src={AVATAR_1}
        width={68}
        height={68}
        alt="avatar-image_1"
        className="absolute bottom-8 left-40 rounded-full"
      />
      <Image
        src={AVATAR_2}
        width={48}
        height={48}
        alt="avatar-image_2"
        className="absolute top-22 left-22 rounded-full"
      />
      <Image
        src={AVATAR_3}
        width={30}
        height={30}
        alt="avatar-image_3"
        className="absolute bottom-26 right-36 rounded-full -translate-z-8 rotate-x-10 -rotate-z-40"
      />
      <Image
        src={AVATAR_4}
        width={58}
        height={58}
        alt="avatar-image_4"
        className="absolute top-20 right-22 rounded-full"
      />
      <Image
        src={LOGIN_BG_IMAGE}
        width={540}
        height={386}
        alt="auth-login-bg"
      />
    </div>
  );
}
