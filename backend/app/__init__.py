from flask import Flask, jsonify
from flask_cors import CORS   # ← add this
from app.celery_app import celery
from .routes.auth import auth
from .routes.posts import posts
from .routes.oauth import oauth
from .routes.analytics import analytics

def create_app():
    app = Flask(__name__)

    # Enable CORS on all /api/* endpoints from any origin (for dev)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Health check
    @app.route('/api/health')
    def health_check():
        return jsonify(status="healthy", service="social-media-dashboard")

    # Register your blueprints
    app.register_blueprint(auth, url_prefix="/api")
    app.register_blueprint(posts, url_prefix="/api")
    app.register_blueprint(oauth, url_prefix="/api")
    app.register_blueprint(analytics, url_prefix="/api")

    return app
