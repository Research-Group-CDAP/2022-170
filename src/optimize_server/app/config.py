from pydantic import BaseSettings

class CommonSettings(BaseSettings):
    APP_NAME: str= "cdap project"
    DEBUG_MODE:bool = False

class DatabaseSettings(BaseSettings):
    DB_URL:str = "mongodb+srv://root:root@today.wx6kn.mongodb.net/CDAP?retryWrites=true&w=majority"
    DB_NAME: str = "CDAP"

class Settings(CommonSettings,DatabaseSettings):
    pass

settings = Settings()