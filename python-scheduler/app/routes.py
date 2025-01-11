from flask import Blueprint

# Define the blueprint
bp = Blueprint('routes', __name__)

@bp.route('/schedule', methods=['POST'])
def schedule():
    return "This is the schedule endpoint."
