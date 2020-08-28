$('#send').click(function () {
    let country = $('#county').val();
    let fname = $('#fname').val();
    let lnam = $('#lname').val();
    let email = $('#email').val();
    let password = $('#password').val();
    let address = $('#address').val();
    let address_line = $('#address_line').val();
    let city = $('#city').val();
    let state = $('#state').val();
    let zip = $('#zip').val();
    let phone = $('#phone').val();
    console.log(country)
    if (country != '0') {
        if (fname.length > 3) {
            if (lnam.length > 3) {
                if (validateEmail(email)) {
                    if (checkPassword(password) && password === $('#repassword').val()) {
                        if (address.length > 3) {
                            if (city.length > 3) {
                                if (state.length > 4) {
                                    if (zip.length > 4) {
                                        if (phone.length === 10) {
                                            let data = {
                                                country: country,
                                                fname: fname,
                                                lname: lnam,
                                                email: email,
                                                password: password,
                                                address: address,
                                                address_line: address_line,
                                                city: city,
                                                state: state,
                                                zip: zip,
                                                phone: phone,
                                            };

                                            $.post('/store', data, (res) => {
                                                if(res.state){
                                                    $('#success').html(res.reason);
                                            $('#success').show('slow');
                                            setTimeout(function () {
                                                $('#success').hide('slow');
                                            }, 3000);
                                                }else{
                                                    $('#error').html(res.reason);
                                            $('#error').show('slow');
                                            setTimeout(function () {
                                                $('#error').hide('slow');
                                            }, 3000);
                                                }
                                            });
                                        } else {
                                            $('#error').html('Please enter valid phone number');
                                            $('#error').show('slow');
                                            setTimeout(function () {
                                                $('#error').hide('slow');
                                            }, 3000);
                                        }
                                    } else {
                                        $('#error').html('Please enter valid zip code');
                                        $('#error').show('slow');
                                        setTimeout(function () {
                                            $('#error').hide('slow');
                                        }, 3000);
                                    }
                                } else {
                                    $('#error').html('Please enter valid state');
                                    $('#error').show('slow');
                                    setTimeout(function () {
                                        $('#error').hide('slow');
                                    }, 3000);
                                }
                            } else {
                                $('#error').html('Please enter valid city');
                                $('#error').show('slow');
                                setTimeout(function () {
                                    $('#error').hide('slow');
                                }, 3000);
                            }
                        } else {
                            $('#error').html('Please enter valid address');
                            $('#error').show('slow');
                            setTimeout(function () {
                                $('#error').hide('slow');
                            }, 3000);
                        }
                    } else {
                        $('#error').html('Please check password ');
                        $('#error').show('slow');
                        setTimeout(function () {
                            $('#error').hide('slow');
                        }, 3000);
                    }
                } else {
                    $('#error').html('Please enter valid email');
                    $('#error').show('slow');
                    setTimeout(function () {
                        $('#error').hide('slow');
                    }, 3000);
                }
            } else {
                $('#error').html('Last name should contain at least 3 characters');
                $('#error').show('slow');
                setTimeout(function () {
                    $('#error').hide('slow');
                }, 3000);
            }
        } else {
            $('#error').html('name should contain at least 3 characters');
            $('#error').show('slow');
            setTimeout(function () {
                $('#error').hide('slow');
            }, 3000);
        }
    } else {
        $('#error').html('Please select valid country');
        $('#error').show('slow');
        setTimeout(function () {
            $('#error').hide('slow');
        }, 3000);
    }


});


function validateEmail(email) {
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
return re.test(String(email).toLowerCase());
}

function checkPassword(str)
{
var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
console.log(re.test(str));
return re.test(str);
}