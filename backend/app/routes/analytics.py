from flask import Blueprint, jsonify

analytics = Blueprint('analytics', __name__)

@analytics.route('/analytics', methods=['GET'])
def get_analytics():
    # Simulate analytics data
    return jsonify({"users": 42, "posts": 88})
