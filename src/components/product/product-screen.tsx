"use client";

import { Bell, Command, Search } from "lucide-react";
import { productModes } from "@/components/product/product-data";
import type { ProductMode } from "@/store/use-product-store";

export function ProductScreen({ mode, compact = false }: { mode: ProductMode; compact?: boolean }) {
  const currentIndex = productModes.findIndex((item) => item.id === mode);
  const current = productModes[currentIndex];

  return (
    <div className={`product-screen ${compact ? "is-compact" : ""}`} aria-label={`Trionn ${mode} product preview`}>
      <div className="screen-topbar">
        <div className="screen-window-controls" aria-hidden><span /><span /><span /></div>
        <div className="screen-command"><Command size={13} /> TRIONN / CORE SPACE</div>
        <div className="screen-tools"><Search size={14} /><Bell size={14} /><span className="screen-status"><i /> Live</span></div>
      </div>

      <div className="screen-body">
        <aside className="screen-sidebar" aria-label="Product preview navigation">
          <div className="screen-sidebar-brand">T/</div>
          {productModes.map((item, index) => (
            <div className={`screen-side-item ${index === currentIndex ? "is-active" : ""}`} key={item.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b>{item.id}</b>
            </div>
          ))}
          <div className="screen-side-spacer" />
          <div className="screen-avatar">YE</div>
        </aside>

        <div className="screen-canvas">
          <div className="screen-canvas-head">
            <div><span className="screen-overline">SPRINT 08 / PRODUCT CORE</span><h3>{current.title}</h3></div>
            <button type="button" aria-label="Open product menu">•••</button>
          </div>

          <div className={`screen-workspace is-${mode}`}>
            <article className="workspace-card workspace-card-primary" data-flip-card="direction">
              <span className="workspace-label">Active direction</span>
              <strong>{mode === "signal" ? "Evidence before opinion" : mode === "system" ? "One system, every state" : "Ready means visible"}</strong>
              <p>{current.stat}</p>
              <div className="workspace-progress"><span style={{ width: `${current.progress}%` }} /></div>
            </article>

            <article className="workspace-card workspace-card-map" data-flip-card="map">
              <span className="workspace-label">Connected map</span>
              <div className="map-node map-node-a">Goal</div>
              <div className="map-node map-node-b">Flow</div>
              <div className="map-node map-node-c">State</div>
              <div className="map-node map-node-d">Release</div>
              <svg viewBox="0 0 320 180" role="img" aria-label="Connected product workflow">
                <path d="M55 45 C105 45 95 90 150 90 S215 48 270 48" />
                <path d="M150 90 C155 135 210 135 260 132" />
                <path d="M55 45 C70 118 94 132 128 132" />
              </svg>
            </article>

            <article className="workspace-card workspace-card-team" data-flip-card="team">
              <span className="workspace-label">Live owners</span>
              <div className="team-row"><span className="team-avatar">AY</span><div><strong>Product</strong><small>Reviewing direction</small></div><i /></div>
              <div className="team-row"><span className="team-avatar">MK</span><div><strong>Design</strong><small>Updating system</small></div><i /></div>
              <div className="team-row"><span className="team-avatar">DR</span><div><strong>Engineering</strong><small>Ready for handoff</small></div><i /></div>
            </article>

            <article className="workspace-card workspace-card-activity" data-flip-card="activity">
              <span className="workspace-label">Decision stream</span>
              <div className="activity-line"><span>09:42</span><p>Launch criteria approved</p></div>
              <div className="activity-line"><span>09:18</span><p>Navigation state updated</p></div>
              <div className="activity-line"><span>08:54</span><p>Research signal connected</p></div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
