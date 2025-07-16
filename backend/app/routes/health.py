from flask import Blueprint, jsonify

health_bp = Blueprint('health', __name__)

@health_bp.route('/health', methods=['GET'])
def health_check():
    """
    Health-check endpoint returning a JSON payload.
    """
    return jsonify({
        'status': 'healthy',
        'service': 'social-media-dashboard'
    }), 200