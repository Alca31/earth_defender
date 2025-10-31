var Input = /** @class */ (function () {
    function Input() {
    }
    Input.getAxisX = function () {
        return this.axisX;
    };
    Input.getIsShooting = function () {
        return Input.isShooting;
    };
    Input.listen = function () {
        // Codez ici...
        window.addEventListener("keydown", function (event) {
            console.log(event.key);
            switch (event.key) {
                case "d":
                case "D":
                    Input.axisX = 1;
                    break;
                case "q":
                case "Q":
                    Input.axisX = -1;
                    break;
                case " ":
                    Input.isShooting = true;
                    console.log("release space", "input:", Input.isShooting);
                    break;
                default:
                    break;
            }
        });
        window.addEventListener("keyup", function (event) {
            switch (event.key) {
                case "d":
                case "D":
                case "q":
                case "Q":
                    Input.axisX = 0;
                    break;
                case " ":
                    Input.isShooting = false;
                    console.log("push space");
                    break;
                default:
                    break;
            }
        });
    };
    Input.axisX = 0;
    Input.isShooting = false;
    return Input;
}());
export { Input };
