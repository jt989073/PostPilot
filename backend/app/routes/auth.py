from flask import Blueprint, request, jsonify
from uuid import uuid4

auth = Blueprint("auth", __name__)

@auth.route("/login", methods=["POST"])
def login():
    """
    Minimal mock login endpoint for early development.

    Expects JSON: { "email": "...", "password": "..." }  (password ignored)
    Returns: { "token": "<uuid>", "user": { "email": "...", "id": 1 } }
    """
    data = request.get_json(silent=True) or {}
    email = data.get("email")
    # password = data.get("password")  # ignored for now

    if not email:
        return jsonify(error="email is required"), 400

    token = uuid4().hex  # placeholder until real JWT

    return jsonify(
        token=token,
        user={"email": email, "id": 1},
    ), 200


@auth.route("/register", methods=["POST"])
def register():
    """
    Placeholder registration route.
    """
    data = request.get_json(silent=True) or {}
    # Add real registration logic later.
    return jsonify(message="User registered", received=data), 201
