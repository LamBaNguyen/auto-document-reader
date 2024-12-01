from app._init_ import create_app
app = create_app()

if __name__ == "__main__":
    with app.app_context():
        print(app.url_map)  # In ra danh sách route
    app.run(debug=True)  # Chạy ứng dụng Flask
