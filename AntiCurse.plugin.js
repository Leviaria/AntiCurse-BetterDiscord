/**
 * @name AntiCurse
 * @author DevUpdates
 * @version 1.1.0
 * @description Ersetzt Schimpfwörter durch freundliche Alternativen.
 */

module.exports = (() => {
    return class AntiCurse {
        constructor() {
            this.curseWords = [
                "hurensohn", "wichser", "hdf", "hdm", "fick deine mutter", "fotze", "arschloch", "schwanzlutscher",
                "schwuchtel", "nutte", "hure", "bastard", "spast", "mongoloid", "behindert", "idiot", "trottel",
                "depp", "vollidiot", "volltrottel", "vollpfosten", "vollarsch", "vollspast", "vollbehindert",
                "fettsack", "fettwanst", "dickwanst", "fettarsch", "dickarsch", "fettarschloch", "dickarschloch",
                "fettfotze", "dickfotze", "fettnutte", "dicknutte", "fetthure", "dickhure", "fettbastard", "dickbastard",
                "fettspast", "dickspast", "fettmongoloid", "dickmongoloid", "fettbehindert", "dickbehindert",
                "fettidiot", "dickidiot", "fetttrottel", "dicktrottel", "fettdepp", "dickdepp", "fettwichser", "dickwichser",
                "fettschwuchtel", "dickschwuchtel", "fettschwanzlutscher", "dickschwanzlutscher", "fettarschloch", "dickarschloch"
            ];
            this.goodWords = [
                "Liebe", "Freude", "Frieden", "Hoffnung", "Licht", "Lächeln", "Umarmung", "Freund", "Freundlichkeit", "Hilfsbereit",
                "Fröhlich", "Toll", "Großartig", "Fantastisch", "Wunderbar", "Gnade", "Weisheit", "Genial", "Sonnenschein", "Süß",
                "Segen", "Schön", "Glanz", "Hell", "Ruhe", "Kreativ", "Träumer", "Elegant", "Freundlich", "Lustig",
                "Sanft", "Gebend", "Glücklich", "Ehrlich", "Bescheiden", "Inspiriert", "Heiter", "Gerecht", "Herzlich", "Loyal",
                "Lieblich", "Magisch", "Bezaubernd", "Modest", "Ordentlich", "Edel", "Optimistisch", "Leidenschaftlich", "Geduldig", "Verspielt",
                "Höflich", "Positiv", "Rein", "Strahlend", "Entspannt", "Widerstandsfähig", "Respektvoll", "Aufrichtig", "Klug", "Seelenvoll",
                "Stark", "Hilfreich", "Talentiert", "Dankbar", "Nachdenklich", "Vertrauenswürdig", "Einzigartig", "Erhebend", "Lebendig", "Siegreich",
                "Warm", "Willkommen", "Herzensgut", "Weise", "Witzig", "Begeistert", "Mitfühlend", "Zuvorkommend", "Mutig", "Ergeben",
                "Fleißig", "Eifrig", "Gläubig", "Vergebend", "Großzügig", "Aufrichtig", "Leuchtend", "Dankbar", "Anmutig", "Bodenständig",
                "Harmonisch", "Hilfreich", "Ehrenhaft", "Fantasievoll", "Fröhlich", "Verlässlich", "Goldig", "Nett", "Zauberhaft", "Belebend"
            ];
        }

        start() {
            console.log("AntiCurse Plugin gestartet");
            this.patchSendMessage();
        }

        patchSendMessage() {
            const MessageEvents = BdApi.findModuleByProps("sendMessage");
            if (!MessageEvents) return;

            const origSend = MessageEvents.sendMessage;
            const curseWords = this.curseWords;
            const goodWords = this.goodWords;

            MessageEvents.sendMessage = function(channelId, message, ...args) {
                let words = message.content.split(/\b/);

                words = words.map(word => {
                    const index = curseWords.indexOf(word.toLowerCase());
                    return index !== -1 ? goodWords[index % goodWords.length] || word : word;
                });

                message.content = words.join("");
                return origSend.call(this, channelId, message, ...args);
            };
        }

        stop() {
            window.location.reload();
        }
    };
})();
