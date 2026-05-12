"use client";

import GiscusComponent from "@giscus/react";

export default function Giscus() {
  return (
    <div className="w-full">
      <GiscusComponent
        repo="Ricka7x/snapback-web"
        repoId="R_kgDORVgJvw"
        category="Announcements"
        categoryId="DIC_kwDORVgJv84C84dn"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="transparent_dark"
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
