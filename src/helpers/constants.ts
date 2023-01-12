import { v4 as uuid } from 'uuid'

export const blurDataUrl =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMVtz2FAAEKgIZAnKvygAAAABJRU5ErkJggg=='

export const navigation = {
  quick: [
    { id: uuid(), name: 'Company', href: '#' },
    { id: uuid(), name: 'Services', href: '#' },
    { id: uuid(), name: 'Contact', href: '#' },
  ],
  resources: [
    { id: uuid(), name: 'Pricing', href: '#' },
    { id: uuid(), name: 'Newsroom', href: '#' },
    { id: uuid(), name: 'FAQ', href: '#' },
  ],
}

export const defaultUser = {
  username: '',
  email: '',
  phoneNumber: null,
  isPhoneVerified: false,
  deviceType: '',
  gender: null,
  dateOfBirth: null,
  clientBalance: 0,
  facebookLoginId: null,
  image: '',
  role: null,
  status: 0,
  countryCode: '',
  countryName: '',
  countryFlag: '',
  tournamentsWon: 0,
  tournamentsEntered: null,
  highestRank: 0,
  practiceGames: 0,
  highestPracticeScore: 0,
  highestTournamentScore: 0,
}

export const socialButtons = [
  { id: uuid(), src: '/social/discord.png', alt: 'Discord', href: '#' },
  { id: uuid(), src: '/social/facebook.png', alt: 'Facebook', href: '#' },
  { id: uuid(), src: '/social/twitter.png', alt: 'Twitter', href: '#' },
  { id: uuid(), src: '/social/telegram.png', alt: 'Telegram', href: '#' },
  { id: uuid(), src: '/social/instagram.png', alt: 'Instagram', href: '#' },
]

export const paymentButtons = [
  { id: uuid(), src: '/payments/visa.svg', alt: 'Visa', href: '#' },
  { id: uuid(), src: '/payments/mastercard.svg', alt: 'Mastercard', href: '#' },
]

export const recoveryFormTitleSuccess = {
  title: {
    main: 'Email',
    sub: 'Sent.',
  },
  subtitle: {
    main: 'If you are a registered MegaFans user, an email has been sent to that address.',
    sub: 'Please check Spam/Blocked folder if you have not received it.',
  },
}

export const recoveryFormTitle = {
  title: {
    main: 'Forgot',
    sub: 'password.',
  },
  subtitle: {
    main: 'Enter your email address and we will send you an email with a link to change your password.',
  },
}

export const registerFormTitle = {
  title: {
    main: 'Sign up',
    sub: 'Start earning and playing with us today.',
  },
  subtitle: {
    main: 'Join players from all around the world playing the most exciting Mobile, Web3 and Browser based games.',
  },
}

export const loginFormTitle = {
  title: {
    main: 'WHERE do we start ?',
    sub: 'GameFi Tournament System.',
  },
  subtitle: {
    main: 'Play-and-Win NFTs, Crypto, RL Rewards NFTs Earn In-Game Tokens (Revenue) Global MMO Tournaments Active Esports Community.',
  },
}

export const resetFormTitle = {
  title: {
    main: 'Enter new',
    sub: 'password.',
  },
  subtitle: {
    main: 'Enter your email address and we will send you an email with a link to change your password.',
  },
}

export const pricing = {
  tiers: [
    {
      title: 'Fan',
      avalible: 1990,
      features: [
        'Access to private members-only Discord channel.',
        'Privileges and discounts in the MegaFans MegaMart.',
        'Special perks (giveaways).',
      ],
      cta: 'Buy with',
      mostPopular: false,
    },
    {
      title: 'Mega Fan',
      avalible: 1199,
      features: [
        'Access to private members-only Discord channel.',
        'Privileges and discounts in the MegaFans MegaMart.',
        'Special perks (giveaways).',
      ],
      cta: 'Buy with',
      mostPopular: true,
    },
    {
      title: 'Giga Fan',
      avalible: 1998,
      features: [
        'Access to private members-only Discord channel.',
        'Privileges and discounts in the MegaFans MegaMart.',
        'Special perks (giveaways).',
      ],
      cta: 'Buy with',
      mostPopular: false,
    },
  ],
}
