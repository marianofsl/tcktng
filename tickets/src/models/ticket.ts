import mongoose from 'mongoose';

// To understand this code look at chapter 146, 147

// This interface describe the attributes that
// are required to create a new User
interface TicketAttrs {
    title: string;
    price: string;
    userId: string;
}

// This interface describe what a User
// Document has
interface TicketDoc extends mongoose.Document {
    title: string;
    price: string;
    userId: string;
}

// This interface describe the attributes that
// User model has
interface TicketModel extends mongoose.Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

ticketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };