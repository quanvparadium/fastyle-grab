import { AgeGroup, Gender, Season, UsageCloth } from '~/constants/enum'

export function parseGender(gender: string): Gender {
    switch (gender) {
        case 'Men':
            return Gender.Men
        case 'Women':
            return Gender.Women
        case 'Unisex':
            return Gender.Unisex
        case 'Girls':
            return Gender.Girls
        case 'Boys':
            return Gender.Boys
        default:
            throw new Error('Invalid gender value')
    }
}

export function parseSeason(season: string): Season {
    switch (season) {
        case 'Spring':
            return Season.Spring
        case 'Summer':
            return Season.Summer
        case 'Fall':
            return Season.Fall
        case 'Winter':
            return Season.Winter
        case '':
            return Season.Unknown
        default:
            throw new Error('Invalid season value')
    }
}

export function parseAge(ageGroup: string): AgeGroup {
    switch (ageGroup) {
        case 'Adults-Men':
            return AgeGroup.AdultsMen
        case 'Adults-Women':
            return AgeGroup.AdultsWomen
        case 'Adults-Unisex':
            return AgeGroup.AdultsUnisex
        case 'Kids-Boys':
            return AgeGroup.KidsBoys
        case 'Kids-Girls':
            return AgeGroup.KidsGirls
        case 'Kids-Unisex':
            return AgeGroup.KidsUnisex
        case '':
            return AgeGroup.Unknown
        default:
            throw new Error('Invalid age group value')
    }
}

export function parseUsage(usage: string): UsageCloth {
    switch (usage) {
        case 'Sports':
            return UsageCloth.Sports
        case 'Casual':
            return UsageCloth.Casual
        case 'Travel':
            return UsageCloth.Travel
        case 'Formal':
            return UsageCloth.Formal
        case 'Smart Casual':
            return UsageCloth.SmartCasual
        case 'Ethnic':
            return UsageCloth.Ethnic
        case 'Party':
            return UsageCloth.Party
        default:
            if (['NA', 'Home', ''].includes(usage)) return UsageCloth.Others
            throw new Error('Invalid age group value')
    }
}
