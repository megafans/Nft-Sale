export type User = {
  user: {
    username: string
    email: string
    phoneNumber: string | null
    isPhoneVerified: boolean
    deviceType: string
    gender: string | null
    dateOfBirth: Date | null
    clientBalance: number
    facebookLoginId: string | null
    image: string
    role: string | null
    status: number
    countryCode: string
    countryName: string
    countryFlag: string
    tournamentsWon: number
    tournamentsEntered: string[] | null
    highestRank: number
    practiceGames: number
    highestPracticeScore: number
    highestTournamentScore: number
  }
}
