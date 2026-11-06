'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  FacebookShareButton,
  XShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  FacebookLegacyIcon as FacebookIcon,
  XLegacyIcon as XIcon,
  WhatsappLegacyIcon as WhatsappIcon,
  LinkedinLegacyIcon as LinkedinIcon,
  TelegramLegacyIcon as TelegramIcon,
} from 'react-share';
import { Share2, Link as LinkIcon, Check, Copy, ChevronDown } from 'lucide-react';

interface ShareButtonsProps {
  url?: string;
  title: string;
  description?: string;
  lang?: 'en' | 'bn';
  variant?: 'dropdown' | 'bar';
  className?: string;
}

export function ShareButtons({
  url: propUrl,
  title,
  description = '',
  lang = 'bn',
  variant = 'dropdown',
  className = '',
}: ShareButtonsProps) {
  const isEn = lang === 'en';
  const [shareUrl, setShareUrl] = useState(propUrl || '');
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLocalhost, setIsLocalhost] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      setIsLocalhost(isLocal);

      let current = propUrl || window.location.href;
      const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
      if (envSiteUrl && (current.includes('localhost') || current.includes('127.0.0.1'))) {
        try {
          const parsed = new URL(current);
          const base = new URL(envSiteUrl);
          parsed.protocol = base.protocol;
          parsed.host = base.host;
          current = parsed.toString();
        } catch {}
      }
      setShareUrl(current);
    }
  }, [propUrl]);

  // Handle copy to clipboard
  const handleCopy = async () => {
    const targetUrl = shareUrl || (typeof window !== 'undefined' ? window.location.href : '');
    if (!targetUrl) return;

    try {
      await navigator.clipboard.writeText(targetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = targetUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Helper when clicking social button (also copies link to clipboard as convenience)
  const handleSocialClick = async () => {
    try {
      const targetUrl = shareUrl || (typeof window !== 'undefined' ? window.location.href : '');
      if (targetUrl) {
        await navigator.clipboard.writeText(targetUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {}
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // If variant is 'bar', display a dedicated card at the end of the lesson
  if (variant === 'bar') {
    return (
      <div className={`p-5 rounded-2xl border border-border/80 bg-card/60 shadow-xs space-y-3.5 not-prose ${className}`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0">
              <Share2 size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {isEn ? 'Share this lesson' : 'এই পাঠটি শেয়ার করুন'}
              </p>
              <p className="text-xs text-muted-foreground">
                {isEn
                  ? 'Help other traders learn and grow'
                  : 'ট্রেডিং কমিউনিটি বা বন্ধুদের সাথে শেয়ার করুন'}
              </p>
            </div>
          </div>

          {/* Copy Link Button */}
          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-medium transition-all ${
              copied
                ? 'bg-up/15 border-up/40 text-up'
                : 'bg-panel border-border hover:border-gold/50 text-foreground hover:text-gold'
            }`}
          >
            {copied ? (
              <>
                <Check size={14} className="text-up" />
                <span>{isEn ? 'Link Copied!' : 'লিঙ্ক কপি হয়েছে!'}</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>{isEn ? 'Copy Link' : 'লিঙ্ক কপি করুন'}</span>
              </>
            )}
          </button>
        </div>

        {/* Social Share Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          {/* WhatsApp */}
          <WhatsappShareButton
            url={shareUrl}
            message={`${title} | TradeNotes`}
            separator=" — "
            className="transition-transform hover:scale-105 active:scale-95"
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-surface hover:border-gold/60 border border-line text-fg2 hover:text-fg text-xs font-medium transition-colors">
              <WhatsappIcon size={20} round />
              <span>WhatsApp</span>
            </div>
          </WhatsappShareButton>

          {/* Facebook */}
          <FacebookShareButton
            url={shareUrl}
            hashtag="#TradeNotes"
            beforeOnClick={handleSocialClick}
            className="transition-transform hover:scale-105 active:scale-95"
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-surface hover:border-gold/60 border border-line text-fg2 hover:text-fg text-xs font-medium transition-colors">
              <FacebookIcon size={20} round />
              <span>Facebook</span>
            </div>
          </FacebookShareButton>

          {/* Twitter / X */}
          <XShareButton
            url={shareUrl}
            text={`${title} — via @TradeNotes`}
            hashtags={['Forex', 'Trading', 'TradeNotes']}
            className="transition-transform hover:scale-105 active:scale-95"
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-surface hover:border-gold/60 border border-line text-fg2 hover:text-fg text-xs font-medium transition-colors">
              <XIcon size={20} round />
              <span>Twitter / X</span>
            </div>
          </XShareButton>

          {/* LinkedIn */}
          <LinkedinShareButton
            url={shareUrl}
            beforeOnClick={handleSocialClick}
            className="transition-transform hover:scale-105 active:scale-95"
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-surface hover:border-gold/60 border border-line text-fg2 hover:text-fg text-xs font-medium transition-colors">
              <LinkedinIcon size={20} round />
              <span>LinkedIn</span>
            </div>
          </LinkedinShareButton>

          {/* Telegram */}
          <TelegramShareButton
            url={shareUrl}
            text={`${title} | TradeNotes`}
            className="transition-transform hover:scale-105 active:scale-95"
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-surface hover:border-gold/60 border border-line text-fg2 hover:text-fg text-xs font-medium transition-colors">
              <TelegramIcon size={20} round />
              <span>Telegram</span>
            </div>
          </TelegramShareButton>
        </div>

        {/* Localhost friendly note */}
        {isLocalhost && (
          <p className="text-[11px] text-muted-foreground/85 flex items-start gap-1.5 pt-1.5 border-t border-border/50">
            <span className="text-gold shrink-0">💡</span>
            <span>
              {isEn
                ? 'Note: Facebook requires a public domain to crawl and show preview cards. On localhost, the link is auto-copied to clipboard so you can paste it in your post.'
                : 'নোট: ফেসবুক প্রিভিউ কার্ড তৈরি করতে লাইভ ওয়েবসাইট স্ক্যান করে। লোকালহোস্টে টেস্ট করার জন্য বাটনে ক্লিক করলেই লিঙ্ক কপি হয়ে যাবে—পোস্টে পেস্ট (Paste) করতে পারেন। লাইভ সার্ভারে স্বয়ংক্রিয় কার্ড আসবে।'}
            </span>
          </p>
        )}
      </div>
    );
  }

  // Variant is 'dropdown' (compact button for header)
  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border bg-panel text-muted-foreground hover:text-foreground hover:border-gold/50 transition-all text-[11px] font-medium shadow-2xs"
      >
        <Share2 size={11} className="text-gold" aria-hidden />
        <span>{isEn ? 'Share' : 'শেয়ার'}</span>
        <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-50 w-72 rounded-2xl border border-border bg-card p-3 animate-in fade-in-50 zoom-in-95 space-y-3">
          <div className="flex items-center justify-between border-b border-border/60 pb-2">
            <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Share2 size={13} className="text-gold" />
              {isEn ? 'Share this lesson' : 'লেসনটি শেয়ার করুন'}
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">TradeNotes</span>
          </div>

          {/* Copy link bar */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-panel border border-border/80">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 min-w-0 bg-transparent text-[11px] font-mono text-muted-foreground px-1 outline-hidden truncate"
            />
            <button
              onClick={handleCopy}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium transition-all shrink-0 ${
                copied
                  ? 'bg-up text-bg font-bold'
                  : 'bg-gold text-background hover:bg-gold/90'
              }`}
            >
              {copied ? (
                <>
                  <Check size={11} />
                  <span>{isEn ? 'Copied' : 'কপি হয়েছে'}</span>
                </>
              ) : (
                <>
                  <Copy size={11} />
                  <span>{isEn ? 'Copy' : 'কপি'}</span>
                </>
              )}
            </button>
          </div>

          {/* Social icons grid */}
          <div className="grid grid-cols-5 gap-2 pt-1 text-center">
            {/* WhatsApp */}
            <WhatsappShareButton
              url={shareUrl}
              message={`${title} | TradeNotes`}
              separator=" — "
              onClick={() => setIsOpen(false)}
              className="group flex flex-col items-center gap-1 hover:opacity-90 transition-opacity"
            >
              <WhatsappIcon size={32} round />
              <span className="text-[10px] text-muted-foreground group-hover:text-foreground">WhatsApp</span>
            </WhatsappShareButton>

            {/* Facebook */}
            <FacebookShareButton
              url={shareUrl}
              hashtag="#TradeNotes"
              beforeOnClick={handleSocialClick}
              onClick={() => setIsOpen(false)}
              className="group flex flex-col items-center gap-1 hover:opacity-90 transition-opacity"
            >
              <FacebookIcon size={32} round />
              <span className="text-[10px] text-muted-foreground group-hover:text-foreground">Facebook</span>
            </FacebookShareButton>

            {/* Twitter / X */}
            <XShareButton
              url={shareUrl}
              text={`${title} — via @TradeNotes`}
              hashtags={['Forex', 'Trading', 'TradeNotes']}
              onClick={() => setIsOpen(false)}
              className="group flex flex-col items-center gap-1 hover:opacity-90 transition-opacity"
            >
              <XIcon size={32} round />
              <span className="text-[10px] text-muted-foreground group-hover:text-foreground">X (Twitter)</span>
            </XShareButton>

            {/* LinkedIn */}
            <LinkedinShareButton
              url={shareUrl}
              beforeOnClick={handleSocialClick}
              onClick={() => setIsOpen(false)}
              className="group flex flex-col items-center gap-1 hover:opacity-90 transition-opacity"
            >
              <LinkedinIcon size={32} round />
              <span className="text-[10px] text-muted-foreground group-hover:text-foreground">LinkedIn</span>
            </LinkedinShareButton>

            {/* Telegram */}
            <TelegramShareButton
              url={shareUrl}
              text={`${title} | TradeNotes`}
              onClick={() => setIsOpen(false)}
              className="group flex flex-col items-center gap-1 hover:opacity-90 transition-opacity"
            >
              <TelegramIcon size={32} round />
              <span className="text-[10px] text-muted-foreground group-hover:text-foreground">Telegram</span>
            </TelegramShareButton>
          </div>

          {/* Localhost notice in dropdown */}
          {isLocalhost && (
            <div className="pt-2 border-t border-border/50 text-[10px] text-muted-foreground leading-tight flex items-start gap-1">
              <span className="text-gold shrink-0">💡</span>
              <span>
                {isEn
                  ? 'Localhost: Link is copied to clipboard so you can paste in Facebook.'
                  : 'লোকালহোস্ট: ফেসবুকে শেয়ার করার জন্য লিঙ্কটি ক্লিপবোর্ডে কপি হয়ে যাবে।'}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
