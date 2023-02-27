const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const mongooseSoftDelete = require('mongoose-delete');

const validateEmail = (email) => {
    const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ 
    return regex.test(email);
};

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,    //controla los espacios que digita a la derecha e izquierda
        required: [true, 'El nombre del usuario es requerido']
    },
    lastname: {
        type: String,
        trim: true,
        required: [true, 'El apellido del usuario es requerido']
    },
    age: {
        type: String,
        min: [18, 'La edad mínima es de 18 años'],
        max: [90, 'La edad máxima es de 18 años']
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, 'El email es requerido'],
        //unique: true,
        validate: {
            validator: validateEmail,
            message: 'Por favor digite un correo válido'
        }
    },
    genre: {
        type: String,
        required: false,
        enum: ['masculino', 'femenino']
    },
    familiares: {
        type: [{
            type: String,
            trim: true,
            require: [true, 'El nombre del familiar es requerido']
        }],
        required: false
    }

}, { timestamps: true });

userSchema.plugin(mongooseSoftDelete);

/*linea que implementa el poder utilizar un correo que fue borrado del sistema poder ser utilizado por otro usuario siempre y cuando se alla borrado el anterior usuario*/
userSchema.index({ email: true, deleted: true }, { unique: true });


module.exports = User = mongoose.model('User', userSchema);


   /* createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    delatedAt: {
        type: Date,
        required: false
    }*/