class GDPR {

    constructor() {
        this.showContent();
        this.bindEvents();

        if(this.cookieStatus() !== 'accept') this.showGDPR();
    }

    bindEvents() {
        let buttonAccept = document.querySelector('.gdpr-consent__button--accept');
        buttonAccept.addEventListener('click', () => {
            this.cookieStatus('accept');
            this.showContent();
            this.hideGDPR();
        });


//student uitwerking

        let buttonReject = document.querySelector('.gdpr-consent__button--reject');
        buttonReject.addEventListener('click', () => {
            this.cookieStatus('reject');
            this.showContent();
            this.hideGDPR();
        });

    }

    showContent() {
        this.resetContent();
        const status = this.cookieStatus() == null ? 'not-chosen' : this.cookieStatus();
        const element = document.querySelector(`.content-gdpr-${status}`);
        element.classList.add('show');

    }

    resetContent(){
        const classes = [
            '.content-gdpr-accept',

//student uitwerking

            '.content-gdpr-not-chosen',
            '.content-gdpr-reject'];

        for(const c of classes){
            document.querySelector(c).classList.add('hide');
            document.querySelector(c).classList.remove('show');
        }
    }

    cookieStatus(status) {
        let consentChoice = localStorage.getItem('gdpr-consent-choice');

        if (!consentChoice) {
            if (status) {
                consentChoice = {
                    status: status,
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString()
                };
                localStorage.setItem('gdpr-consent-choice', JSON.stringify(consentChoice));
            } else {
                return null;
            }
        } else {
            consentChoice = JSON.parse(consentChoice);
            if (status) {
                consentChoice.status = status;
                consentChoice.date = new Date().toString();
                consentChoice.time = new Date().getTime();
                localStorage.setItem('gdpr-consent-choice', JSON.stringify(consentChoice));
            }
        }

        return consentChoice.status;
    }



//student uitwerking


    hideGDPR(){
        document.querySelector(`.gdpr-consent`).classList.add('hide');
        document.querySelector(`.gdpr-consent`).classList.remove('show');
    }

    showGDPR(){
        document.querySelector(`.gdpr-consent`).classList.add('show');
        document.querySelector(`.gdpr-consent`).classList.remove('hide');
    }

}

const gdpr = new GDPR();

