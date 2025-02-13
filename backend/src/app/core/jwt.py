from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from fastapi import HTTPException
from dotenv import load_dotenv
import os

load_dotenv()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

SECRET_KEY = os.getenv("SUPABASE_JWT_SECRET_KEY")
ALGORITHM = os.getenv("JWT_ALGORITHM")


def verify_jwt_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(
            token, f"{SECRET_KEY}", algorithms=[ALGORITHM], audience="authenticated"
        )
        return payload
    except JWTError as e:
        print(f"JWT ERROR: {e}")
        raise HTTPException(status_code=403, detail="Invalid token")
