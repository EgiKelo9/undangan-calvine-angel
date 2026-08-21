// ─── Cover Page ───────────────────────────────────────────────────────────────
export interface CoverConfig {
  bgImage: string;
  subtitle: string;
  title: string;
  cardLabel: string;
  defaultGuestName: string;
  invitationText: string;
  buttonText: string;
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
export interface HeroConfig {
  bgImages: string[];
  subtitle: string;
  title: string;
  date: string;
  ctaButtonText: string;
}

export interface CountdownTarget {
  isoDate: string;
}

// ─── Person Section ───────────────────────────────────────────────────────────
export interface GreetingDetails {
  title: string;
  text: string;
}

export interface PersonDetails {
  label: string;
  fullName: string;
  nickName: string;
  childRelation: string;
  fatherName: string;
  motherName: string;
  address: string;
  photo: string;
}

export interface CoupleDetails {
  displayName: string;
  weddingDate: string;
  groom: PersonDetails;
  bride: PersonDetails;
}

export interface MepandesDetails {
  title: string;
  participants: string[];
  relationLabel?: string;
  parents?: {
    father: string;
    mother: string;
  };
}

// ─── Quote Section ────────────────────────────────────────────────────────────
export interface QuoteDetails {
  verse: string;
  meaning: string;
  source: string;
}

// ─── Event Section ────────────────────────────────────────────────────────────
export interface EventVenue {
  address: string;
  mapsEmbedUrl: string;
  mapsLink: string;
}

export interface EventSchedule {
  title: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  location?: string;
}

export interface EventSectionDetails {
  title: string;
  description: string;
  venue: EventVenue;
  leftSchedule: EventSchedule;
  rightSchedule: EventSchedule;
}

// ─── Gallery Section ──────────────────────────────────────────────────────────
export interface GalleryItem {
  src: string;
  alt: string;
}

export interface GallerySectionConfig {
  title: string;
  items: GalleryItem[];
}

// ─── Gift Section ─────────────────────────────────────────────────────────────
export interface BankAccount {
  bank: string;
  accountNumber: string;
  accountName: string;
}

export interface GiftSectionConfig {
  title: string;
  description: string;
  accounts: BankAccount[];
}

// ─── RSVP Section ─────────────────────────────────────────────────────────────
export interface RsvpSectionConfig {
  title: string;
  namePlaceholder: string;
  messagePlaceholder: string;
  attendanceOptions: string[];
}

export interface WishEntry {
  timestamp: string;
  name: string;
  message?: string | null;
  attendance: string;
}

// ─── Footer Section ───────────────────────────────────────────────────────────
export interface FooterConfig {
  brandName: string;
  brandTagline: string;
  designer: string;
  year: number;
  instagram?: string;
  tiktok?: string;
  whatsapp?: string;
}

// ─── Audio Config ─────────────────────────────────────────────────────────────
export interface AudioConfig {
  src: string;
  title?: string;
  artist?: string;
}

// ─── Ornaments (shared across sections) ──────────────────────────────────────
export interface OrnamentsConfig {
  balineseHeader1: string;
  balineseHeader2: string;
  balineseHeader3: string;
  balineseHeader4: string;
  floralBackground: string;
}

// ─── Root Data Type ───────────────────────────────────────────────────────────
export interface WeddingData {
  cover: CoverConfig;
  hero: HeroConfig;
  countdown: CountdownTarget;
  greeting: GreetingDetails;
  couple: CoupleDetails;
  mepandes: MepandesDetails;
  quote: QuoteDetails;
  eventSection: EventSectionDetails;
  gallery: GallerySectionConfig;
  gift: GiftSectionConfig;
  rsvp: RsvpSectionConfig;
  footer: FooterConfig;
  ornaments: OrnamentsConfig;
  audio: AudioConfig;
}

