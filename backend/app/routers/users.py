from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import schemas
from app.crud.user import user as crud_user
from app.deps import get_db, get_current_active_user
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=List[schemas.User])
def read_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    users = crud_user.get_multi(db, skip=skip, limit=limit)
    return users

@router.get("/me", response_model=schemas.User)
def read_user_me(
    current_user: User = Depends(get_current_active_user),
):
    return current_user

@router.get("/{user_id}", response_model=schemas.User)
def read_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    user = crud_user.get(db, id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
