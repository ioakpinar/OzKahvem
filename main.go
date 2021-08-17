package main

import (
	"context"
	"encoding/json"
	"fmt"
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
	ID          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Id          int32              `json:"id,omitempty" bson:"id,omitempty"`
	Name        string             `json:"name,omitempty" bson:"name,omitempty"`
	Description string             `json:"description,omitempty" bson:"description,omitempty"`
	Image       string             `json:"image,omitempty" bson:"image,omitempty"`
	Time        int32              `json:"time,omitempty" bson:"time,omitempty"`
	//Prices   	   []int32            `json:"prices,omitempty" bson:"prices,omitempty"`
}

//Order struct definition (Model)
type Order struct {
	ID                    primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	SId                   string
	CoffieName            string `json:"CoffieName,omitempty" bson:"CoffieName,omitempty"`
	CoffieSize            string `json:"CoffieSize,omitempty" bson:"CoffieSize,omitempty"`
	IsDelivered           bool   `json:"IsDelivered" bson:"IsDelivered"`
	EstimatedDeliveryTime int32  `json:"EstimatedDeliveryTime,omitempty" bson:"EstimatedDeliveryTime,omitempty"`
	OrderTime             string `json:"OrderTime" bson:"OrderTime"`
}

//Price struct definition (Model)
// type Price struct {
// 	ID         primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
// 	CoffieName string             `json:"CoffieName,omitempty" bson:"CoffieName,omitempty"`
// 	CoffieSize string             `json:"CoffieSize,omitempty" bson:"CoffieSize,omitempty"`
// 	Cost       float32            `json:"Cost,omitempty" bson:"cost,omitempty"`
// }

var client *mongo.Client

func get_order(response http.ResponseWriter, request *http.Request) { //gets order from customer and adds it to db
	(response).Header().Set("Access-Control-Allow-Origin", "*")
	response.Header().Add("content-type", "application/json")
	// variable for store the order
	var order Order
	// get json object and decode it to varible
	json.NewDecoder(request.Body).Decode(&order)
	fmt.Println("order ", order)
	//to prevent adding wrong orders to collection
	if order.CoffieName == "" || order.CoffieSize == "" {
		json.NewEncoder(response).Encode("Coffie name or Coffie size cannot be empty")
		return
	}
	//connect orders collection)
	ordersCollection := client.Database("Özkahvem").Collection("orders")
	//connect coffies collection
	coffiesCollection := client.Database("Özkahvem").Collection("coffies")
	//create db context object
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	// get last order not yet delivered
	var lastOrder Order
	//sort documents by descending id order and select first not delivered order to calculate delivery time
	opts := options.FindOne()
	opts.SetSort(bson.D{{Key: "_id", Value: -1}})
	ordersCollection.FindOne(ctx, bson.D{{Key: "IsDelivered", Value: false}}, opts).Decode(&lastOrder)
	//create a coffie object
	var coffie Coffie
	//get information of ordered coffie
	coffiesCollection.FindOne(ctx, bson.M{"name": order.CoffieName}).Decode(&coffie)
	fmt.Println(coffie)
	// // date time of order
	order.OrderTime = carbon.Now().ToDateTimeString()
	// total time remain for this order
	order.EstimatedDeliveryTime = lastOrder.EstimatedDeliveryTime + coffie.Time
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
	oid, err := primitive.ObjectIDFromHex(order.SId)
	order.ID = oid
	ordersCollection := client.Database("Özkahvem").Collection("orders")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	result, err := ordersCollection.UpdateOne(
		ctx,
		bson.M{"_id": order.ID},
		bson.D{
			{"$set", bson.D{{Key: "IsDelivered", Value: true}}},
		},
	)
	if err != nil {
		log.Fatal(err)
	}
	json.NewEncoder(response).Encode(result)
}

func get_coffies(response http.ResponseWriter, request *http.Request) { // get all coffies with about and prices
	response.Header().Add("content-type", "application/json")
	var coffies []Coffie
	coffiesCollection := client.Database("Özkahvem").Collection("coffies")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	coffiesCursor, _ := coffiesCollection.Find(ctx, bson.M{})
	coffiesCursor.All(ctx, &coffies)
	// fn0(coffies, coffiesCollection, ctx)
	fmt.Println(coffies)
	json.NewEncoder(response).Encode(coffies)
}

func fn0(coffies []Coffie, coffiesCollection *mongo.Collection, ctx context.Context) { // update all data in coffies
	var prices []int32
	prices = append(prices, 12, 15, 18)
	for _, coffie := range coffies {

		result, err := coffiesCollection.UpdateOne(
			ctx,
			bson.M{"_id": coffie.ID},
			bson.D{
				{"$set", bson.D{{"prices", prices}}},
			},
		)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(coffie, result)
	}
}

func get_time(response http.ResponseWriter, request *http.Request) {
	fmt.Println("fonk çalıştı")
	response.Header().Add("content-type", "application/json")
	ordersCollection := client.Database("Özkahvem").Collection("orders")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	var lastOrder Order
	opts := options.FindOne()
	opts.SetSort(bson.D{{Key: "_id", Value: -1}})
	ordersCollection.FindOne(ctx, bson.D{{Key: "IsDelivered", Value: false}}, opts).Decode(&lastOrder)
	fmt.Println(lastOrder)
	json.NewEncoder(response).Encode(lastOrder.EstimatedDeliveryTime)
}

func main() {
	//db id: dbAdmin pwd: VcVaVK9Ku5v
	clientOptions := options.Client().
		ApplyURI("mongodb+srv://dbAdmin:VcVaVK9Ku5v@cluster0.ytljy.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, _ = mongo.Connect(ctx, clientOptions)

	databases, err := client.ListDatabaseNames(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(databases)

	//create router to navigate requests
	router := mux.NewRouter()

	//"OPTION" added due to CORS's preflight
	router.HandleFunc("/getorder", get_order).Methods("POST", "OPTIONS")
	router.HandleFunc("/listorders", list_orders).Methods("GET", "OPTIONS")
	router.HandleFunc("/deliverorder", deliver_order).Methods("POST", "OPTIONS")
	router.HandleFunc("/getcoffies", get_coffies).Methods("GET", "OPTIONS")
	router.HandleFunc("/gettime", get_time).Methods("GET", "OPTIONS")

	//port to serve
	http.ListenAndServe(":12345", router)
}
