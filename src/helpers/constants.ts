export const blurDataUrl =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMVtz2FAAEKgIZAnKvygAAAABJRU5ErkJggg=='

export const navigation = {
  quick: [
    { name: 'Company', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'Contact', href: '#' },
  ],
  resources: [
    { name: 'Pricing', href: '#' },
    { name: 'Newsroom', href: '#' },
    { name: 'FAQ', href: '#' },
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
  { src: '/social/facebook.png', alt: 'Facebook', href: '#' },
  { src: '/social/twitter.png', alt: 'Twitter', href: '#' },
  { src: '/social/telegram.png', alt: 'Telegram', href: '#' },
  { src: '/social/instagram.png', alt: 'Instagram', href: '#' },
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
