// kommentar database
const baseUrl = "https://sl-restprovider.azurewebsites.net/api/comment"
// raspberry/klasse database
const tempUrl = "https://simonappservice.azurewebsites.net/api/Measurement/1"
// 3.parts api temp,humi og co2 database
const apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=Copenhagen&appid=e07b0989a4804d8de8024945897ceec2&units=metric"
Vue.createApp({
    data() {
        return {
            // komentar
            Comments: [],
            deleteId: 0,
            deleteMessage: "",
            CommentData: { Commenttext: "" },
            addMessage: "",

            // raspberry/klasse api
            Measurement: [],

            // 3.pats api
            vejrdata: null,

            //dette er til elev knapperne
            varmt: { Commenttext: "Det er for varmt" },
            koldt: { Commenttext: "Det er for koldt" },
            larm: { Commenttext: "Det larmer for meget" },
        }
    },
    // denne funktion er til at køre nogen fuktioner automatisk når siden loades
    async created() {
        this.helperGetAndShow(baseUrl)
        this.helperGetAndShowtemp(tempUrl)
        this.helperGetapi(apiUrl)
    },

    methods:
    {
        //komentar funktioner
        async helperGetAndShow(url) {
            try {
                const response = await axios.get(url)
                this.Comments = await response.data
            } catch (ex) {
                alert(ex.message)
            }
        },

        getAllComment() {
            this.helperGetAndShow(baseUrl)
        },

        async addComment() {
            try {
                response = await axios.post(baseUrl, this.CommentData)
                this.addMessage = "response " + response.status + " " + response.statusText
                this.getAllComment()
            } catch (ex) {
                alert(ex.message)
            }
        },

        async deleteComment(deleteId) {
            const url = baseUrl + "/" + deleteId
            try {
                response = await axios.delete(url)
                this.deleteMessage = response.status + " " + response.statusText
                this.getAllComment()
            } catch (ex) {
                alert(ex.message)
            }
        },

        // elev knapper
        async forvarmt() {
            try {
                response = await axios.post(baseUrl, this.varmt)
                this.addMessage = "response " + response.status + " " + response.statusText
                this.getAllComment()
            } catch (ex) {
                alert(ex.message)
            }
        },

        async forkoldt() {
            try {
                response = await axios.post(baseUrl, this.koldt)
                this.addMessage = "response " + response.status + " " + response.statusText
                this.getAllComment()
            } catch (ex) {
                alert(ex.message)
            }
        },

        async formegetlarm() {
            try {
                response = await axios.post(baseUrl, this.larm)
                this.addMessage = "response " + response.status + " " + response.statusText
                this.getAllComment()
            } catch (ex) {
                alert(ex.message)
            }
        },


        // raspberry/klasse api
        getAllTemp() {
            this.helperGetAndShowtemp(tempUrl)
        },

        async helperGetAndShowtemp(url) {
            try {
                const response = await axios.get(url)
                this.Measurement = await response.data
            } catch (ex) {
                alert(ex.message)
            }
        },

        // 3.parts api
        async helperGetapi(url) {
            try {
                const response = await axios.get(url)
                this.vejrdata = await response.data
                this.error = null
            } catch (ex) {
                this.vejrdata = null
                this.error = ex.message
            }
        }
    }
}).mount("#app")


// dette er en måde at snyde chrome browser til at have en automatisk baggrunds lyd 
// den er ikke nødvendig i andre browsere end chrome 
// og den er grunden til at hjemmesiden spøger om at bruge mikrofonen
navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {

    var x = document.getElementById("myAudio");
    x.play();

    // stop microphone stream acquired by getUserMedia
    stream.getTracks().forEach(function (track) { track.stop(); });
});



