import React, {Component} from 'react';
import { Text, View, ScrollView, FlatList ,StyleSheet,
    Button, Modal} from 'react-native';
import { Card, Icon, Rating , Input } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import { postFavorite ,postComment} from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment))
});

function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Icon
                        raised
                        reverse
                        name={ props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                        />
                    <Icon
                        raised
                        reverse
                        name='pencil'
                        type='font-awesome'
                        color='#0000ff'
                        onPress={() => props.openCommentForm()}
                        />  
                        </View>  
                </Card>
                </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Rating
          imageSize={15}
          readonly
          startingValue={item.rating}
          style={{ alignItems: "flex-start" }}
        />
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>  
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
        </Animatable.View>
    );
}

class Dishdetail extends Component {

    constructor(props){
        super(props);
        this.state={
            showModal: false,
            author: '',
            comment: '',
            rating: 0
        }
    }

    openCommentForm = () => {
        this.setState({showModal: true})
      }
    resetForm(){
    this.setState({
        showModal: false,
            author: '',
            comment: '',
            rating: 0
    });
    }  

    setRating(rating) {
        this.setState({rating})
    }

    setAuthor(author) {
        this.setState({author})
    }

    setComment(comment) {
        this.setState({comment})
    }
    handleComment(dishId){
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
        this.resetForm();
    }

    markFavorite(dishId){
        this.props.postFavorite(dishId);    }

    toggleModal = () => {
        this.setState({showModal: !this.state.showModal})
        }    

      

   

    render() {
        const dishId=this.props.route.params.dishId;

        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el===dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    openCommentForm={() => this.openCommentForm()}
                />
                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => {this.toggleModal(),   this.resetForm()} }
                    onRequestClose = {() => {this.toggleModal(),this.resetForm()} }>
                    <View style = {styles.modal}>
                <Rating showRating fractions="0" startingValue="0" onFinishRating={(rating) => this.setRating(rating)}/>
         
             <Input placeholder='Author'
             leftIcon={
                 <Icon type='font-awesome' name='user-o'/>}
                 onChangeText={(author) => this.setAuthor(author)}
             />

         
             <Input placeholder='Comment' 
                leftIcon={
                <Icon 
                    name='comment-o'
                    type='font-awesome'
                />
                }
            onChangeText={(comment) => this.setComment(comment)}/>
            <View style={{ margin: 10 }}>
             <Button 
                onPress = {() =>{this.toggleModal(); this.handleComment(dishId)}}
                color="#512DA8"
                title="SUBMIT" 
                />
                </View>
                <View style={{ margin: 10 }}>
             <Button 
              onPress={() => {
                this.toggleModal();
                this.resetForm();
              }}
              color="gray"
              title="CANCEL"/>  
              </View>
                
         </View>   
         </Modal>
                <RenderComments comments={this.props.comments.comments.filter((comment)=> comment.dishId===dishId)}/>
                
            </ScrollView>
        );
        
    }
}
const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);