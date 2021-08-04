package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/golang-module/carbon"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

//Coffie struct definition (Model)
type Coffie struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name     string             `json:"name,omitempty" bson:"name,omitempty"`
	About    string             `json:"about,omitempty" bson:"about,omitempty"`
	PrepTime int32              `json:"preptime,omitempty" bson:"preptime,omitempty"`
}

//Order struct definition (Model)
type Order struct {
	ID                    primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	CoffieName            string             `json:"CoffieName,omitempty" bson:"CoffieName,omitempty"`
	CoffieSize            string             `json:"CoffieSize,omitempty" bson:"CoffieSize,omitempty"`
	IsDelivered           bool               `json:"IsDelivered" bson:"IsDelivered"`
	EstimatedDeliveryTime int32              `json:"EstimatedDeliveryTime,omitempty" bson:"EstimatedDeliveryTime,omitempty"`
	OrderTime             string             `json:"OrderTime" bson:"OrderTime"`
}

//Price struct definition (Model)
type Price struct {
	ID         primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	CoffieName string             `json:"CoffieName,omitempty" bson:"CoffieName,omitempty"`
	CoffieSize string             `json:"CoffieSize,omitempty" bson:"CoffieSize,omitempty"`
	Cost       float32            `json:"Cost,omitempty" bson:"cost,omitempty"`
}

var client *mongo.Client

func get_order(response http.ResponseWriter, request *http.Request) {
	//gets order from customer and adds it to db
	response.Header().Add("content-type", "application/json")
	// variable for store the order
	var order Order
	// get json object and decode it to varible
	json.NewDecoder(request.Body).Decode(&order)
	//connect orders collection)
	ordersCollection := client.Database("Özkahvem").Collection("orders")
	//connect coffies collection
	coffiesCollection := client.Database("Özkahvem").Collection("coffies")
	//create db context object
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	// get all orders not yet delivered
	orderCursor, _ := ordersCollection.Find(ctx, bson.M{"IsDelivered": false})
	// create a slice to hold not delivered orders
	var orders []Order
	orderCursor.All(ctx, &orders)
	//create a coffie object
	var coffie Coffie
	//get information of ordered coffie
	coffiesCollection.FindOne(ctx, bson.M{"Name": order.CoffieName}).Decode(&coffie)
	// variable for calculate total time remain
	var totalTimeRemain int32
	for _, order := range orders {
		// total time remain before last order
		totalTimeRemain += order.EstimatedDeliveryTime
	}
	// date time of order
	order.OrderTime = carbon.Now().ToDateTimeString()
	// total time remain for this order
	order.EstimatedDeliveryTime = totalTimeRemain + coffie.PrepTime
	// insert it to orders collection
	result, _ := ordersCollection.InsertOne(ctx, order)
	// print out inserted order's id
	json.NewEncoder(response).Encode(result)
}

func list_orders(response http.ResponseWriter, request *http.Request) {
	//endpoint to gel all unfinished orders
	response.Header().Add("content-type", "application/json")
	var orders []Order
	ordersCollection := client.Database("Özkahvem").Collection("orders")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	orderCursor, _ := ordersCollection.Find(ctx, bson.M{"IsDelivered": false})
	orderCursor.All(ctx, &orders)
	json.NewEncoder(response).Encode(orders)
}

func deliver_order(response http.ResponseWriter, request *http.Request) {
	//finish order by id
	response.Header().Add("content-type", "application/json")
	var order Order
	json.NewDecoder(request.Body).Decode(&order)
	ordersCollection := client.Database("Özkahvem").Collection("orders")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	result, err := ordersCollection.UpdateOne(
		ctx,
		bson.M{"_id": order.ID},
		bson.D{
			{"$set", bson.D{{"IsDelivered", true}}},
		},
	)
	if err != nil {
		log.Fatal(err)
	}
	json.NewEncoder(response).Encode(result)
}

func main() {
	//db id: dbAdmin pwd: VcVaVK9Ku5v*gh$
	clientOptions := options.Client().
		ApplyURI("mongodb+srv://dbAdmin:VcVaVK9Ku5v*gh$@cluster0.ytljy.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, _ = mongo.Connect(ctx, clientOptions)
	//create router to navigate requests
	router := mux.NewRouter()

	router.HandleFunc("/getorder", get_order).Methods("POST")
	router.HandleFunc("/listorders", list_orders).Methods("GET")
	router.HandleFunc("/deliverorder", deliver_order).Methods("POST")

	//port to serve
	http.ListenAndServe(":12345", router)

	//pull and push test for new branch
}
