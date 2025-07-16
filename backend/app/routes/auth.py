from flask import Blueprint, request, jsonify

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST'])
def login():
    data = request.json
    # Add your login logic here
    return jsonify({"message": "Login successful"}), 200

@auth.route('/register', methods=['POST'])
def register():
    data = request.json
    # Add your registration logic here
    return jsonify({"message": "User registered"}), 201
