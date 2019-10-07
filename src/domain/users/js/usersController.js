leantime.usersController = (function () {

    // Variables (underscore for private variables)
    var publicThing = "not secret";
    var _privateThing = "secret";

    var _uploadResult;

    //Constructor
    (function () {

    })();

    //Functions

    var readURL = function (input) {

        clearCroppie();

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            var profileImg = jQuery('#profileImg');
            reader.onload = function (e) {
                //profileImg.attr('src', e.currentTarget.result);

                _uploadResult = profileImg
                    .croppie(
                        {
                            enableExif: true,
                            viewport: {
                                width: 175,
                                height: 175,
                                type: 'circle'
                            },
                            boundary: {
                                width: 200,
                                height: 200
                            }
                        }
                    );

                _uploadResult.croppie(
                    'bind', {
                        url: e.currentTarget.result
                    }
                );

                jQuery("#previousImage").hide();
            };

            reader.readAsDataURL(input.files[0]);
        }
    };

    var clearCroppie = function () {
        jQuery('#profileImg').croppie('destroy');
        jQuery("#previousImage").show();
    };

    var saveCroppie = function () {

        jQuery('#save-picture').addClass('running');

        jQuery('#profileImg').attr('src', '/images/loaders/loader28.gif');
        _uploadResult.croppie(
            'result', {
                type: "blob",
                circle: true
            }
        ).then(
            function (result) {
                    leantime.usersService.saveUserPhoto(result);
            }
        );
    };

    // Make public what you want to have public, everything else is private
    return {
        readURL: readURL,
        clearCroppie: clearCroppie,
        saveCroppie: saveCroppie
    };
})();