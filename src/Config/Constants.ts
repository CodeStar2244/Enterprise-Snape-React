class Constants {
    public static readonly NavbarTabs =   {
        HOME : "HOME",
        STUDIOMANAGEMENT:"STUDIOMANAGEMENT",
        GALLARY:"GALLARY",
        ASSETREGISTRY:"ASSETREGISTERY",
        MUSIC:"MUSIC"
    }
    public static readonly active = "activeNavMenu"
    public static readonly adminbackendUrl = "https://admin.snape.app/sa"
    public static readonly clientViewUrl = "http://snape-react-app.s3-website-us-east-1.amazonaws.com/view/"
    public static readonly fonts:any = {
        Sans: {
            fontWeight: "700",
            fontFamily: "'Montserrat', sans-serif"
        },
    
        Serif: {
            fontWeight: "500",
            fontFamily: "'Cormorant,serif'"
        },
    
        Modern: {
            fontWeight: "500",
            fontFamily: "'Tenor Sans', sans-serif"
        },
    
        Timeless: {
            fontWeight: "500",
            fontFamily: "'Spectral', serif"
        },
    
        Bold: {
            fontWeight: "500",
            fontFamily: "'Syne', sans-serif"
        },
    
        Subtle: {
            fontWeight: "700",
            fontFamily: "'Montserrat', sans-serif"
        }
    }
}

export default Constants;