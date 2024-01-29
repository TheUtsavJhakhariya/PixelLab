  var imageLoader = document.getElementById('imageLoader');
        imageLoader.addEventListener('change', handleImage, false);

        var canvas = document.getElementById('imageCanvas');
        var ctx = canvas.getContext('2d');
        var img = new Image(); 
 
        function handleImage(e) {
            var reader = new FileReader();
            reader.onload = function(event) {
                img.onload = function() {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                }
                img.src = event.target.result;
            }
            reader.readAsDataURL(e.target.files[0]);     
        }
 
        var brightness = 0; // Initialize brightness
        var contrast = 1; // Initialize contrast

        // Adjust contrast and brightness
        function adjustImage() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var data = imageData.data;

            for (var i = 0; i < data.length; i += 4) {
                data[i] = truncate(data[i] * contrast + brightness);     // red
                data[i + 1] = truncate(data[i + 1] * contrast + brightness); // green
                data[i + 2] = truncate(data[i + 2] * contrast + brightness); // blue
            }

            ctx.putImageData(imageData, 0, 0);
        }

        // Truncate color values to valid range
        function truncate(value) {
            return Math.min(255, Math.max(0, value));
        }

        document.getElementById('increaseBrightness').addEventListener('click', function() {
            brightness += 15;
            adjustImage();
        });

        document.getElementById('decreaseBrightness').addEventListener('click', function() {
            brightness -= 15;
            adjustImage();
        });

        document.getElementById('increaseContrast').addEventListener('click', function() {
            contrast += 0.1;
            adjustImage();
        });

        document.getElementById('decreaseContrast').addEventListener('click', function() {
            contrast -= 0.1;
            adjustImage();
        });

        // Save image functionality
        document.getElementById('saveImage').addEventListener('click', function() {
            var image = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
            var link = document.createElement('a');
            link.download = 'edited-image.jpg';
            link.href = image;
            link.click();
        });
