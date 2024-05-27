export enum Month {
    JANUARY = "Janeiro",
    FEBRUARY = "Fevereiro",
    MARCH = "Março",
    APRIL = "Abril",
    MAY = "Maio",
    JUNE = "Junho",
    JULY = "Julho",
    AUGUST = "Agosto",
    SEPTEMBER = "Setembro",
    OCTOBER = "Outubro",
    NOVEMBER = "Novembro",
    DECEMBER = "Dezembro"
}

export class MonthUtils {
    translateEnumName(enumValue: string): string {
        switch(enumValue) {
            case "Janeiro": return "JANUARY"
            case "Fevereiro": return "FEBRUARY"
            case "Março": return "MARCH"
            case "Abril": return "APRIL"
            case "Maio": return "MAY"
            case "Junho": return "JUNE"
            case "Julho": return "JULY"
            case "Agosto": return "AUGUST"
            case "Setembro": return "SEPTEMBER"
            case "Outubro": return "OCTOBER"
            case "Novembro": return "NOVEMBER"
            case "Dezembro": return "DECEMBER"
            default: return ""
        }
    }
}