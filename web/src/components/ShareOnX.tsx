import React from "react";

// Lets create some fun messages to encourage users to share their setup on X (formerly Twitter)
const messages = [
  "OMG just discovered Snapback and it's a game-changer for my workflow! Check it out! ",
  "Snapback is the best thing to happen to my productivity! Highly recommend it! ",
  "Can't believe I lived without Snapback until now! It's a must-have! ",
  "Snapback has completely transformed how I work. You need to try it! ",
  "Just set up Snapback and I'm already obsessed! It's amazing! ",  
];

function getRandomMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}

export default function ShareOnX() {
  const baseUrl = "https://snapbackapp.com";
  const text = encodeURIComponent(`${getRandomMessage()} @snapbackapp_dev`);
  const url = `https://x.com/intent/tweet?text=${text}&url=${baseUrl}`;

  return (
    <div className="text-center mt-12">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block px-4 py-2 rounded-lg border border-white/10 text-sm text-gray-300 hover:bg-white/5 transition"
        >
        Share your setup on X
      </a>
    </div>
  );
}