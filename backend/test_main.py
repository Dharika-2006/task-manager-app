from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_home():

    response = client.get("/")

    assert response.status_code == 200

def test_register():

    response = client.post(
        "/register",
        json={
            "email": "testpytest@gmail.com",
            "password": "123456"
        }
    )

    assert response.status_code in [200, 400]