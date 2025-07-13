from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/convertAscii", methods=["POST"])
def convert_ascii():
    try:
        input_string = request.form["inputText"]
        result = [(char, ord(char)) for char in input_string]
        return render_template("result.html", input=input_string, result=result)
    except Exception as e:
        return f"<center><h2 style='color:red; margin-top:50px;'>Error: {str(e)}</h2></center>"

if __name__ == "__main__":
    app.run(debug=True)
