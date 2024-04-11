from config import db
from models import User, FanMail, Media, Comment

def seed_database():
    # Create sample users
    user1 = User(username='IsaacFan1', password_hash='password1')
    user2 = User(username='HateIsaac2', password_hash='password2')
    user3 = User(username='Fan3', password_hash='password3')

    # Add sample fan mails
    fan_mail1 = FanMail(content="Love Isaac", user=user1)
    fan_mail2 = FanMail(content="Hate Isaac", user=user2)
    fan_mail3 = FanMail(content="I hate and love isaac", user=user3)

    # Add sample media posts
    media1 = Media(type="photo", image_url="image_url_1", user=user1)
    media2 = Media(type="photo", image_url="image_url_2", user=user2)
    media3 = Media(type="photo", image_url="image_url_3", user=user3)

    # Add sample comments on fan mails
    comment1 = Comment(description="Comment on fan mail 1", user=user1, fan_mail=fan_mail1)
    comment2 = Comment(description="Comment on fan mail 2", user=user2, fan_mail=fan_mail2)
    comment3 = Comment(description="Comment on fan mail 3", user=user3, fan_mail=fan_mail3)

    # Add sample comments on media posts
    comment4 = Comment(description="Comment on media post 1", user=user1, media=media1)
    comment5 = Comment(description="Comment on media post 2", user=user2, media=media2)
    comment6 = Comment(description="Comment on media post 3", user=user3, media=media3)

    # Add objects to session and commit to database
    db.session.add_all([user1, user2, user3, fan_mail1, fan_mail2, fan_mail3,
                        media1, media2, media3, comment1, comment2, comment3,
                        comment4, comment5, comment6])
    db.session.commit()

if __name__ == "__main__":
    seed_database()
    print("Database seeded successfully.")